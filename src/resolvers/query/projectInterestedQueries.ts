
import GraphQLJSON from 'graphql-type-json';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allProjectInterested: async (parent, args, context) => {
            try {
                const allProjectInterested = await prisma.projectInterested.findMany({
                    where: {

                        deleted: null,
                    }
                })
                return allProjectInterested
            }
            catch (e) {
                console.log(e)
            }
        },

        detailProjectInterested: async (parent, args, context) => {
            try {
                const detailProjectInterested = await prisma.projectInterested.findFirst({
                    where: {
                        projectId: +args.projectId
                    },
                })
                if (detailProjectInterested === null) {
                    return null
                }

                return detailProjectInterested
            } catch (e) {
                console.log(e)

            }
        },
    }
}