import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
import { sendNotification } from '../repositories/notificationRepository'
export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProject: async (parent, args, context,) => {
      try {
        const { userId } = context
        const createProject = await prisma.project.create({
          data: {
            ...args.data,
            authorUserId: userId
          },
        })
        sendNotification(userId, 1, createProject, 'project')
        return createProject
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateProject: async (parent, args, content,) => {
      try {
        const idProject = +args.data.id
        delete (args.data)['id']
        const updateProject = await prisma.project.update({
          where: {
            id: idProject
          },
          data: {
            ...args.data
          }
        })
        return updateProject
      }
      catch (e) {
        console.log(e)
      }
    },
    upsertProjectMembers: async (parent, args, context,) => {
      try {

        const upsertProjectMember = await prisma.project.upsert({
          where: {
            memberUserId: args.data.memberUserId
          },
          update: {
            ...args.data,
          },
          create: {
            ...args.data,
          }

        })
        return upsertProjectMember

      } catch (e) {
        console.log(e)

      }
    },
    deleteProject: async (parent, args, content,) => {
      try {
        const now = new Date()
        const deleteProject = await prisma.project.delete({
          where: {
            id: +args.id
          },
        })
        return true
      }
      catch (e) {
        console.log(e)
      }
    },

  }
}





