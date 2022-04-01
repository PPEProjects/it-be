
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allUserFeedback: async (parent, args, context) => {
            try {
                var allUserFeedback = await prisma.userFeedback.findMany({
                    where: {
                        deleted: null, },   
                })
                return allUserFeedback
            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
    }
}