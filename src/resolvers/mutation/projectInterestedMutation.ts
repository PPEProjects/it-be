import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'
import projectInterestedTypeDefs from '../../typeDefs/projectInterestedTypeDefs';



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectInterested: async (parent, args, context,) => {

      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
          where: { id: userId }
        })
        const createProjectInterested = await prisma.projectInterested.create({
          data: {
            ...args.data,
            projectId : +args.data.projectId,
            userId: userId
          },
        })
        createProjectInterested.user = user
        return createProjectInterested
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

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





