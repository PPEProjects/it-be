
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
import _ = require('lodash');

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allNotification: async (parent, args, context) => {
            try {
               
            }
            catch (e) {
                console.log(e)
            }
        },

        detailNotification: async (parent, args, context) => {
            try {
                
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
                            in: args.type
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
                return notification
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
    }
}