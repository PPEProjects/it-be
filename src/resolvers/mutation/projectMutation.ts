import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')

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
        return createProject
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateProject: async (parent, args, content,) => {
      try {
        const updateProject = await prisma.project.update({
          where: {
            id: +args.data.id
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
        const deleteProject = await prisma.project.update({
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





