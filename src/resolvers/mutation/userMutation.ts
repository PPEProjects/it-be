
// const { prisma } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
const { prismaUser } = require("../../database")
const prisma = prismaUser
export default {
  Mutation: {
    signupUser: async (parent, args, context) => {
      try {
        const postData = args.data.posts?.map((post) => {
          return { title: post.title, content: post.content || undefined }
        })
        const password = await bcrypt.hash(args.data.password, 10)
        const user = await prisma.user.create({
          data: {
            ...args.data,
            password
          },
        })
        const token = jwt.sign({ userId: user.id }, `${process.env.APP_SECRET}`)
        return {
          token,
          user,
        }
      }
      catch (e) {
        console.log(e)
      }
    },


  }



}
