
import GraphQLJSON from 'graphql-type-json';
import projectTypeDefs from '../../typeDefs/projectTypeDefs';
import projectInterestedMutation from '../mutation/projectInterestedMutation';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allProjectInterested: async (parent, args, context) => {
            try {
                const allProjectInterested = await prisma.projectInterested.findMany({

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
                        projectId : +args.projectId
                    },

                })
                const project = await prisma.Project.findMany({
                    where: {
                        id: +args.projectId
                    }
                })
                detailProjectInterested.project = project
                
                return detailProjectInterested
            } catch (e) {
                console.log(e)

            }
        },
    }
}