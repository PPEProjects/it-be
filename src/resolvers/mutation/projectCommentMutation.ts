import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
import { arch } from 'os';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')



export default {
  JSON: GraphQLJSON,
  Mutation: {
    createProjectComment: async (parent, args, context,) => {
  
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        const createProjectComment = await prisma.projectComment.create({
          data: {
            ...args.data,
            userId: userId
          },
        })
        createProjectComment.user = user
        return createProjectComment
      }
      catch (e) {
        console.log(e)
        return new ApolloError("this email invalid")

      }
    },
    updateProjectComment: async (parent, args, content,) =>{
      try{
        const updateProjectComment = await prisma.projectComment.update({
            where:{
               id : args.data.id  
            },
            data:{
              ...args.data
            }
        })
        return updateProjectComment
      }
      catch(e){
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },
    deleteProjectComment: async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteProject = await prisma.projectComment.update({
            where:{
              id: args.id 
            },
            data:{
              deleted: now
            }
        })
        return true
      }
      catch(e){
        console.log(e)
      }
    },

    }
}



