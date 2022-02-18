
import GraphQLJSON from 'graphql-type-json';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allProjectInterested: async (parent, args, context) => {
            try {
                console.log(args)
                const allProjectInterested = await prisma.projectInterested.findMany({
                  include: {
                        project: true
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
                const detailProjectInterested = await prisma.projectInterested.findUnique({
                    where:{
                        id: args.id
                    },
                })
                return detailProjectInterested
            } catch (e) {
                console.log(e)
                
            }
        },
    }
}