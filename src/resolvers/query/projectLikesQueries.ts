const _ = require('lodash')
import { ApolloError } from 'apollo-server';
import { count } from 'console';
import GraphQLJSON from 'graphql-type-json';
const { prisma, prismaUser} = require('../../database')

export default {
    JSON: GraphQLJSON,

    Query: {
        allProjectLikes: async (parent, args, context) => {
            try {
                const listProject = await prisma.projectLikes.findMany({
                    where: {
                        deleted: null,
                       
                    },
                })
               
                 return listProject

            }
            catch (e) {
                console.log(e)
            }
        },
        detailProjectLikes: async (parent, args, context) => {
            try {
                const detailProjectLikes = await prisma.projectLikes.findFirst({
                    where: {
                        projectId: +args.projectId
                    },
                })
                if (detailProjectLikes === null) {
                    return null
                }
                const numberLikes = await prisma.projectLikes.aggregate({
                    _count:{
                        id: true
                    },
                    where:{
                        projectId: +args.projectId
                    }
                })
                detailProjectLikes.numberLikes = numberLikes._count.id;

                return detailProjectLikes
            } catch (e) {
                console.log(e)

            }
        },
        }
}