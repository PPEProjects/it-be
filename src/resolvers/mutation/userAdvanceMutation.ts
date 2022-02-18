import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createUserAdvance : async (parent, args, context,) => {
  
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        const createUserAdvance  = await prisma.userAdvance.create({
          data: {
            ...args.data,
            userId: userId
          },
        })
        createUserAdvance.user = user
        return createUserAdvance
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateUserAdvance : async (parent, args, content,) =>{
      try{
        const updateUserAdvance = await prisma.userAdvance .update({
            where:{
              id: args.data.id
            },
            data:{
              ...args.data
            }
        })
        return updateUserAdvance 
      }
      catch(e){
        console.log(e)
      }
    },

    deleteUserAdvance : async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteProjectMembers= await prisma.userAdvance .update({
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





