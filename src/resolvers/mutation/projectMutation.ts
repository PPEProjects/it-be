import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProject: async (parent, args, context,) => {
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        const createProject = await prisma.project.create({
          data: {
            ...args.data,
            authorUserId: userId
          },
        })
        createProject.user = user
        return createProject 
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateProject: async (parent, args, content,) =>{
      try{
        const updateProject = await prisma.project.update({
            where:{
              id: args.data.id
            },
            data:{
              ...args.data
            }
        })
        return updateProject 
      }
      catch(e){
        console.log(e)
      }
    },
    deleteProject: async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteProject = await prisma.project.update({
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





