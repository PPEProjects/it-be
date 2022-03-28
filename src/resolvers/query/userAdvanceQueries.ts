
import { ApolloError } from 'apollo-server';

import GraphQLJSON from 'graphql-type-json';

const _ = require('lodash')
const { prisma, prismaUser } = require('../../database')




export default {
    JSON: GraphQLJSON,

    Query: {
        allUserAdvance: async (parent, args, context) => {
            try {

                const allUserAdvance = await prisma.userAdvance.findMany({
                    where: {
                        deleted: null,
                    },
                })
    
                return allUserAdvance

            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        detailUserAdvance: async (parent, args, context) => {
            try {
                const detailUserAdvance = await prisma.userAdvance.findFirst({
                    where: {
                        userId: +args.userId
                    },
                })
                const numberSelfIdeas = await prisma.project.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        authorUserId: +args.userId
                    }

                })

                const numberJoinProject = await prisma.projectMembers.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        memberUserId: +args.userId
                    }
                })
                const numberAvg = await prisma.userFeedback.aggregate({
                    _avg: {
                        grate: true
                    },
                    where: {
                        userId: +args.userId
                    }
                })
                detailUserAdvance.numberSelfIdeas = numberSelfIdeas._count.id
                detailUserAdvance.numberJoinedProject = numberJoinProject._count.id
                detailUserAdvance.numberAvggrate = numberAvg._avg.grate

                return detailUserAdvance
            } catch (e) {
                console.log(e)
            }
        },
    }
}