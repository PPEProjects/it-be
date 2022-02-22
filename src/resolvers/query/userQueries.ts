
const _ = require('lodash')

const { prismaUser, prisma } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'
export default {
  Query: {
    allUsers: async (parent, args, context) => {
      const allUser = await prismaUser.user.findMany({
      })
      return allUser
    },
    signIn: async (parent, args, context) => {
      const checkUser = await prismaUser.user.findUnique({
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
      
        const getuserAdvance = await prisma.userAdvance.findMany({
          where:{
              userId: args.userId
          },
        
        })
       
        const getuserfeedback = await prisma.userFeedback.findMany({
          where:{
              userId: args.userId
          }
      })
      const getprojectmember = await prisma.projectMembers.findMany({
        where:{
            userId : args.userId
        },
        include:{
            project: true
        }
        
    })
    const project =  await prisma.project.findMany({
      where:{
          id : args.userId
      }
  })
  const numberSeftIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' FROM project WHERE author_user_id = ${args.userId}`
  const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' FROM project_members WHERE user_id=${args.userId}`
  
      me.userAdvance = getuserAdvance
      // console.log(userme.userAdvance)
      me.userFeedback = getuserfeedback
      me.projectMembers = getprojectmember
    me.project = project
    me.seftIdeas = _.first(numberSeftIdeas).number
    console.log(numberSeftIdeas)
    me.joinedProject = _.first(numberJoinProject).joined
  
        return me
      } catch (e) {
        console.log(e)
        
      }

    },
    detailUser: async (parent, args, context) => {  
      const user = await prismaUser.user.findUnique({
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

