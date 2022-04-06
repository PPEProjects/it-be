
import { ApolloError } from 'apollo-server';

import GraphQLJSON from 'graphql-type-json';

const _ = require('lodash')
const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allUserAdvance: async (parent, args, context) => {
            try {

                const allUserAdvance = await prisma.userAdvance.findMany({})
    
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
                return detailUserAdvance
            } catch (e) {
                console.log(e)
                return false
            }
        },
    }
}