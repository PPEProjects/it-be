// import { resolvers, typeDefs } from './schema'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import { prisma } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
const { getUserId } = require("./ulitis/ultis")

const PORT = 4000
new ApolloServer(
  {
    resolvers,
    typeDefs,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        userId:
          req && req.headers.authorization
            ? getUserId(req)
            : null
      };
    },
  }).listen(
    { port: PORT },
    () =>
      console.log(`
  🚀 Server ready at: http://localhost:${PORT}`),
  )

