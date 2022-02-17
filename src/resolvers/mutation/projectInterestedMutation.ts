import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectInterested: async (parent, args, context,) => {
  
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        const createProjectInterested = await prisma.projectInterested.create({
          data: {
            ...args.data,
            userId: userId
          },
        })
        createProjectInterested.user = user
        return createProjectInterested 
      }
      catch (e) {
        console.log(e)
        return new ApolloError("this email invalid")

      }
    },
    updateProjectInterested: async (parent, args, content,) =>{
      try{
        const updateProjectInterested = await prisma.projectInterested.update({
            where:{
              id: args.data.id
            },
            data:{
              ...args.data
            }
        })
        return updateProjectInterested
      }
      catch(e){
        console.log(e)
      }
    },

    deleteProjectInterested: async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteProjectInterested= await prisma.projectInterested.update({
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





