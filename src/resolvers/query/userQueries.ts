
const { prismaUser } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'
const prisma = prismaUser
export default {
  Query: {
    allUsers: async (parent, args, context) => {
      const allUser = await prisma.user.findMany({
      })
      return allUser
    },
    signIn: async (parent, args, context) => {
      const checkUser = await prisma.user.findUnique({
        where: { email: args.email },
      })
      if (!checkUser) {
        return new ApolloError("Invalid email or password!")
      }
      const valid = await bcrypt.compare(args.password, checkUser.password)
      if (!valid) {
        return new ApolloError("Invalid email or password!")
      }
      const logIn = await axios.post(`${process.env.URL_SMILE_EYE_API}/ppe-core/auth/login`,
       { 
          email: args.email,    
          password: args.password 
        }
      );
      const user = logIn.data.data
      const token = user.token

      return {
        token,
        user,
      }
    },
    me: async (parent, args, context) => {  
      const { userId } = context
      console.log(userId)
      if (!userId) {
        return new ApolloError("please login")
      }
      const me = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      delete me['password']
      return me
    },
    detailUser: async (parent, args, context) => {  
      const user = await prisma.user.findUnique({
        where: {
          id: args?.id
        }
      })
      delete user["password"]
      return user
    },
    
  },

}
function id(id: any) {
  throw new Error('Function not implemented.')
}

