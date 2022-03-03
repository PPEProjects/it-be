// import { resolvers, typeDefs } from './schema'
import { resolvers } from './resolvers'
const { typeDefs } = require('./typeDefs')
import { prisma } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import axios from 'axios'
const { getUserId } = require("./ulitis/ultis")

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.

const PORT = 4000
const app = new ApolloServer(
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
  });
app.listen(
  { port: PORT },
  () =>
    console.log(`
  🚀 Server ready at: http://localhost:${PORT}`),
)
