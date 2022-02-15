
const { prismaUser } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
const prisma = prismaUser
export default {
  Query: {
    allUsers: async (parent, args, context) => {
      const allUser = await prisma.user.findMany({
      })
      return allUser
    },
    signIn: async (parent, args, context) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      })
      if (!user) {
        return new ApolloError("Invalid email or password!")
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        return new ApolloError("Invalid email or password!")
      }
      delete user['password']
      const token = jwt.sign({ userId: user.id }, `${process.env.APP_SECRET}`)

      return {
        token,
        user,
      }
    },
    me: async (parent, args, context) => {
      const { userId } = context
      if (!userId) {
        return new ApolloError("please login")
      }
      const me = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include:{
          posts: true,
          infos: true
        }
      })
      delete me['password']
      return me
    }
  },

}
function id(id: any) {
  throw new Error('Function not implemented.')
}

