
import GraphQLJSON from 'graphql-type-json';

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        ExampleQuery: async (parent, args, context) => {
            try {
              const example = {sayHi: "hello world"}
                return example
            }
            catch (e) {
                console.log(e)
            }
        },
        
    }
}