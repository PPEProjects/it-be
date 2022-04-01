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
          var { userId } = context
          if(args.data.userId){
            userId = +args.data.userId
          }
          
        const user = await prismaUser.user.findUnique({
              where:{ id: +userId}
          })
        
        const createUserFeedback = await prisma.userFeedback.create({
          data: {
            ...args.data,
            userId: +userId
          },
        })
        createUserFeedback.user = user
        return createUserFeedback
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateUserFeedback: async (parent, args, content,) =>{
      try{
        const id = +args.data.id
        delete (args.data)['id']
        const updateUserFeedback = await prisma.userFeedback .update({
            where:{
              id: id
            },
            data:{
              ...args.data,
              userId: +args.data.userId
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
        const deleteUserFeedback = await prisma.userFeedback.delete({
            where:{
              id: +args.id 
            },
        })
        return true
      }
      catch(e){
        console.log(e)
      }
    },

    }
}





