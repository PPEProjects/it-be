import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createUserFeedback: async (parent, args, context,) => {
            
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        
        const createUserFeedback = await prisma.userFeedback.create({
          data: {
            ...args.data,
            userId: userId
          },
        })
        createUserFeedback.user = user
        return createUserFeedback
      }
      catch (e) {
        console.log(e)
        return new ApolloError("this email invalid")

      }
    },
    updateUserFeedback: async (parent, args, content,) =>{
      try{
        const updateUserFeedback = await prisma.userFeedback .update({
            where:{
              id: args.data.id
            },
            data:{
              ...args.data
            }
        })
        return updateUserFeedback 
      }
      catch(e){
        console.log(e)
      }
    },

    deleteUserFeedback: async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteUserFeedback = await prisma.userFeedback.update({
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





