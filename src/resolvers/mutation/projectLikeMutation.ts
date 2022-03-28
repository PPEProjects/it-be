import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma,prismaUser } = require('../../database')
import { sendNotification } from '../repositories/notificationRepository'
export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectLikes: async (parent, args, context,) => {
      try {
        const { userId } = context
        const user = await prismaUser.user.findUnique({
          where: { id: userId }
        })
        const createProjectLikes= await prisma.projectLikes.create({
          data: {
            ...args.data,
            projectId : +args.data.projectId,
            userId: userId
          },
        })
        createProjectLikes.user = user
        return createProjectLikes
       
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    deleteProjectLikes: async (parent, args, content,) => {
      try {
        const now = new Date()
        const deleteProject = await prisma.projectLikes.update({
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





