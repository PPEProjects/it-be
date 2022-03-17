
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
import _ = require('lodash');

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allNotification: async (parent, args, context) => {
            try {
                const notification = await prisma.notification.findMany({
                    where:{
                        deleted: null
                    }
                })
                return notification
               
            }
            catch (e) {
                console.log(e)
            }
        },

        detailNotification: async (parent, args, context) => {
            try {
                
                const detailNotification = await prisma.notification.findFirst({
                    where: {
                       id : +args.id
                    },
                })
                console.log(detailNotification)
                if (detailNotification === 0) {
                    return null
                }

                return detailNotification
                
            } catch (e) {
                console.log(e)

            }
        },
        notificationByType: async (parent, args, context) => {
            try {
                const { userId } = context
                const notification = await prisma.notification.findMany({
                    where:{
                        userReceiveId: userId || undefined,
                        type:{
                            in : args.type
                        }
                    },
                    orderBy:{
                        updatedAt: 'desc'
                    }
                })
                _.map(notification, (noti) => {
                    switch(noti.type){
                        case'project':
                        noti.message = `New ${
                                            noti.content?.type || 'project'
                                            } "${
                                            noti.content.name
                                            }"has come. Check it right now.`
                        break;
                    }
                    return noti
                })
                if(notification.length ===0){
                    return null
                }
                return notification
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
    }
}