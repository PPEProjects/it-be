import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')


export default {
  JSON: GraphQLJSON,
  Mutation: {
    createNotification: async (parent, args, context,) => {
      try {
        const { userId } = context
        const createNotification = await prisma.notification.create({
            data:{
                ...args.data,
                userId: +args.data.userId,
                userReceiveId: +args.data.userReceiveId
            }
        })
        return createNotification
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateNotification: async (parent, args, content,) => {
      try {
            const idNotification = +args.data.id
            delete args.data.id
            const updateNotification = await prisma.notification.update({
                where:{
                    id: idNotification
                },
                data:{
                    ...args.data,
                    userId: +args.data.userId,
                    userReceiveId: +args.data.userReceiveId
                }
            })
        return updateNotification
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },

    deleteNotification: async (parent, args, content,) => {
      try {
          const dateNow = new Date()
        const deleteNotification = await prisma.notification.update({
            where:{
                id: +args.id
            },
            data:{
                deleted: dateNow 
            }
        })
        return true
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },

  }
}





