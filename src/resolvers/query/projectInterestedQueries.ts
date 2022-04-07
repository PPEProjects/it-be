
import { ApolloError } from 'apollo-server';
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
                if(allProjectInterested.length === 0){
                    return null
                }
                return allProjectInterested
            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
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
                const numberInterested = await prisma.projectInterested.aggregate({
                    _count:{
                        id: true
                    },
                    where:{
                        projectId: +args.projectId
                    }
                })
            
                detailProjectInterested.numberInterested = numberInterested._count.id;

                return detailProjectInterested
               
            } catch (e) {
                console.log(e)

            }
        },
        myProjectInterested: async (parent, args, context) => {
            try {
                const {userId} = context
                const myProjectInterested = await prisma.projectInterested.findMany({
                    where:{
                        userId: userId
                    }
                })
                return myProjectInterested
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        }
    }
}