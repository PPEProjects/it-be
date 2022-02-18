// import { resolvers, typeDefs } from './schema'
import { resolvers } from './resolvers'
const { typeDefs } =  require('./typeDefs')
import { prisma } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import axios from 'axios'
const { getUserId } = require("./ulitis/ultis")

const PORT = 4000
 const app = new ApolloServer(
  {
    resolvers,
    typeDefs,
    context: async({ req }) => {
      // let webApiUrl = `${process.env.URL_SMILE_EYE_API}/get-token`
      // let gettoken  =  req.headers.authorization
      //   let tokenStr =  gettoken ? gettoken.replace("Bearer", "") : null
      // const res = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
      return {
        ...req,
        prisma,
        userId:
          req && req.headers.authorization
            // ? getUserId(req)
            ? 1
            : null
      };
    },
  })
  app.listen(
    { port: PORT },
    () =>
      console.log(`
  🚀 Server ready at: http://localhost:${PORT}`),
  )

