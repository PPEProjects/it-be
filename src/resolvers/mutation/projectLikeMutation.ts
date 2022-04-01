import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma,prismaUser } = require('../../database')
export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectLikes: async (parent, args, context,) => {
      try {
        const { userId } = context
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const checkLikes = await prisma.projectLikes.findFirst({
          where:{
              userId: getUserId,
              projectId: +args.data?.projectId,
          }
        })
        if(checkLikes === null){
          const createProjectLikes= await prisma.projectLikes.create({
            data: {
              projectId : +args.data.projectId,
              userId: getUserId
            },
          })
          return createProjectLikes
        }

      } catch (e) {
        console.log(e) 
        return new ApolloError(`${e}`)
      }
    
    },
    upsertProjectLikes: async (parent, args, content,) =>{
      try {
        const { userId } = content
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const projectLikes = await prisma.projectLikes.findFirst({
          where:{
              userId: +args.data?.userId,
              projectId: +args.data?.projectId,
              deleted: null,
          }
        })
        if(projectLikes === null){
          const createProjectLikes= await prisma.projectLikes.create({
            data: {
              ...args.data,
              projectId : +args.data.projectId,
              userId: getUserId
            },
          })
          return createProjectLikes
        }

      } catch (e) {
        console.log(e) 
        return new ApolloError(`${e}`)
      }
    },
    
    deleteProjectLikes: async (parent, args, content,) => {
      try {
        const deleteProjectLikes = await prisma.projectLikes.delete({
          where: {
            id: +args.id
          },
        })
        return true
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },

  }
}





