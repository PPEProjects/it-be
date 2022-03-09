
import GraphQLJSON from 'graphql-type-json';
import _ = require('lodash');

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allUserFeedback: async (parent, args, context) => {
            try {
                var allUserFeedback = await prisma.userFeedback.findMany({
                    where: {
                        deleted: null,
                        id: args.id
                    },
                })
                return allUserFeedback
            }
            catch (e) {
                console.log(e)
            }
        },
    }
}