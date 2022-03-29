import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'
import projectInterestedTypeDefs from '../../typeDefs/projectInterestedTypeDefs';
import { isTypeNode } from 'graphql';



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectInterested: async (parent, args, context,) => {
      try {
        const { userId } = context
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const checkInterested = await prisma.projectInterested.findFirst({
          where:{
              userId: getUserId,
              projectId: +args.data?.projectId,
          }
        })
        console.log(checkInterested)
        if(checkInterested === null){
          const createProjectInterested= await prisma.projectInterested.create({
            data: {
              projectId : +args.data.projectId,
              userId: getUserId
            },
          })
          return createProjectInterested
        }
      } catch (e) {
        console.log(e) 
      }
    
    },

    updateProjectInterested: async (parent, args, context,) => {
      try {
        const updateProjectInterested = await prisma.projectInterested.update({
          where: {
            id: +args.data.id
          },
          data: {
              id: +args.data.id,
              projectId: +args.data.projectId,
              userId: +args.data.userId
          
          }
        })
        return updateProjectInterested
      }
      catch (e) {
        console.log(e)
      }
    },

    deleteProjectInterested: async (parent, args, content,) => {
      try {
        const now = new Date()
        const deleteProjectInterested = await prisma.projectInterested.update({
          where: {
            id: +args.id
          },
          data: {
            deleted: now
          }
        })
        return true
      }
      catch (e) {
        console.log(e)
      }
    },

  }
}





