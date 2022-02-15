import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')



export default {
  JSON: GraphQLJSON,
  Mutation: {
    createProjectLike: async (parent, args, context,) => {
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
        const createProjectLike = await prisma.projectLike.create({
          data: {
            ...args.data,
            userId: userId
          },
        })
        return createProjectLike 
      }
      catch (e) {
        console.log(e)
        return new ApolloError("this project is denied")

      }
    },
    updateProjectLike: async (parent, args, content,) =>{
      try{
        const updateProjectLike = await prisma.projectLike.update({
            where:{
              id: args.id 
            },
            data:{
              ...args.data
            }
        })
        return updateProjectLike
      }
      catch(e){
        console.log(e)
      }
    },

    }
}





