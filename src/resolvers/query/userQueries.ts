
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
          take: 4,
          skip: 1, // Skip the cursor
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
        const getNameDB = (process.env.DATABASE_URL_USER)?.split('/')
        const page = args?.page;
        const limit = args?.limit;
        const UserCoreDB = _.last(getNameDB)
        var query = `SELECT u.* 
                    FROM ${UserCoreDB}.users u, user_advance ua
                    WHERE u.id = ua.user_id 
                    AND ua.deleted is null `
        if (args?.name) {
          const name = `'%${args.name}%'`
          const searchName = `AND u.name LIKE ${name} `
          query = query + searchName
        }
        if (args?.roles) {
          const roles = `'%${args.roles}%'`
          const searchRoles = `AND LOWER(ua.roles) LIKE ${roles.toLowerCase()} `
          query = query + searchRoles
        }
        if(page && limit){
          query = query + ` LIMIT ${limit } OFFSET ${(page-1)*limit} `
        }
        const searchUsers = await prisma.$queryRawUnsafe(query)
        return searchUsers
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
        
        // const userFeedback = await prisma.userFeedback.aggregate({
        //   _avg: {
        //     grate: true
        //   },
        //   where: {
        //     userId: userId
        //   }
        // })
        
         const projectMembers = await prisma.projectMembers.findMany({
            where:{
              memberUserId: me.id
            }
         })
         const allPosition = _.map(projectMembers, 'position')
         me.allPosition = _.uniq(allPosition).join(',') 
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
        return new ApolloError(`${e}`)
      }
    },

  },

}

