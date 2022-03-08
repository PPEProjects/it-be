
const _ = require('lodash')
const { prismaUser, prisma } = require('../../database')
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'

export default {

  Query: {
    allUsers: async (parent, args, context) => {
      try {
        const allUser = await prismaUser.user.findMany({
          id: args.userId
        })
        return allUser
      } catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },
    searchUsers: async (parent, args, context) => {
      try {
        var query =`SELECT u.* 
                    FROM japanese_dev_core_db.users u, user_advance ua 
                    WHERE u.id = ua.user_id `
        if(args?.name)
        {
          const name = `'%${args.name}%'`
          const searchName = `and u.name LIKE ${name} `
          query = query + searchName
        }
        if(args?.roles) 
        {
          const roles = `'%${args.roles}%'`
          const searchRoles = `and ua.roles LIKE ${roles} `
          query = query + searchRoles
        }
        var results = await prisma.$queryRawUnsafe(query)
        return results
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }

    },
    signIn: async (parent, args, context) => {
      const user = await prismaUser.user.findUnique({
        where: { email: args.email },
      })
      if (!user) {
        return new ApolloError("Invalid email or password!")
      }
      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        return new ApolloError("Invalid email or password!")
      }
      const getToken = await axios.get(`${process.env.URL_SMILE_EYE_API}/return-token`,
        {
          params: {
            id: user.id
          }
        }
      );
      const token = getToken.data
      return {
        token,
        user,
      }
    },
    me: async (parent, args, context) => {
      try {
        const { userId } = context
        if (!userId) {
          return new ApolloError("please login")
        }
        const me = await prismaUser.user.findUnique({
          where: {
            id: userId
          }
        })
        if (me === null) {
          return null
        }
        // const numberSelfProject = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
        //                                                 FROM project 
        //                                                 WHERE author_user_id = ${userId}`
        const numberSelfProject = await prisma.project.aggregate({
          _count:{
            id: true
          },
          where:{
            authorUserId: userId
          }
        })
        // const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' 
        //                                                   FROM project_members 
        //                                                   WHERE member_user_id=${userId}`
        const numberJoinProject = await prisma.projectMembers.aggregate({
          _count:{
            id: true
          },
          where:{
            memberUserId: userId
          }
        })
        me.numberSelfProject = numberSelfProject._count.id
        me.numberJoinedProject = numberJoinProject._count.id

        return me
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }

    },
    detailUser: async (parent, args, context) => {
      try {
        const user = await prismaUser.user.findFirst({
          where: {
            id: +args.id
          },
        })
        return user
      }
      catch (e) {
        console.log(e)
      }
    },

  },

}
function id(id: any) {
  throw new Error('Function not implemented.')
}

export function User() {
  throw new Error('Function not implemented.')
}

