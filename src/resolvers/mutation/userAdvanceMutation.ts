import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')


export default {
  JSON: GraphQLJSON,

  Mutation: {
    createUserAdvance: async (parent, args, context,) => {

      try {
        const { userId } = context
        const createUserAdvance = await prisma.userAdvance.create({
          data: {
            ...args.data,
            userId: +userId

          },
        })
        return createUserAdvance
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateUserAdvance: async (parent, args, content,) => {
      try {
        const updateUserAdvance = await prisma.userAdvance.update({
          where: {
            id: args.data.id
          },
          data: {
            ...args.data
          }
        })
       
        return updateUserAdvance
      }
      catch (e) {
        console.log(e)
        new ApolloError(`${e}`)
      }
    },

    deleteUserAdvance: async (parent, args, content,) => {

      try {
        const deleteProjectMembers = await prisma.userAdvance.delete({
          where: {
            id: +args.id
          },
        })
        return true
      }
      catch (e) {
        console.log(e)
        new ApolloError(`${e}`)
      }
    },
    upsertUserAdvance: async (parent, args, context) => {
      try {
        const { userId } = context
        const dataUserAdvance = {
          language: args.data.language,
          roles: args.data.roles,
          skill: args.data.skill,
          info: args.data.info,
          plan: args.data.plan,
          goal: args.data.goal,
          deleted: null
        }
        const upsertUserAdvance = await prisma.userAdvance.upsert({
          where: {
            userId: +userId,
          },
          update: {
            ...dataUserAdvance
          },
          create: {
            ...dataUserAdvance,
            userId: userId
          },
        })
        const dataUser = args.data.user
        const updateUser = await prismaUser.user.update({
          where: {
            id: userId
          },
          data: {
            ...dataUser
          },
        })
        upsertUserAdvance.user = updateUser
        return upsertUserAdvance
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },

  }
}





