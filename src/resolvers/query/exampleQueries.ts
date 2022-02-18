
import GraphQLJSON from 'graphql-type-json';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        ExampleQuery: async (parent, args, context) => {
            try {
              const example = {id: 1}
                return example
            }
            catch (e) {
                console.log(e)
            }
        },
        
    }
}