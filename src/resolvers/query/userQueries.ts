
const _ = require('lodash')

const { prismaUser, prisma } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'
import { ary, countBy, get } from 'lodash'
import { getUnpackedSettings } from 'http2'
import { UUID } from 'graphql-scalars/mocks'
export default {
  Query: {
    allUsers: async (parent, args, context) => {
      try {
        const allUser = await prismaUser.user.findMany({
         id: args.userId
        })
      
        for (const user of allUser) {
          const { userId } = context
          const getUserFeedback = await prisma.userFeedback.findMany({
            where: {
              userId: userId
            }
          })
         
          user.userFeedback = getUserFeedback
         
        }

       
        return allUser
      } catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },
    searchUsers: async (parent, args, context) => {
     
      var allUser = await prismaUser.user.findMany({
        where:{
          name:{
            contains: args.name 
          },
        
         
        },
      
        })
        if(allUser.length === 0){
          return null
      }
    
      for (const user of allUser) {
        const { userId } = context
        const getUserFeedback = await prisma.userFeedback.findMany({
          where: {
            userId: userId
          }
        })
       
        user.userFeedback = getUserFeedback
       
      }
     
      const selectroles = prisma.$queryRaw`SELECT * FROM user_advance WHERE roles LIKE '%${args.roles}%'`
     
      allUser.roles = selectroles
    
  
    
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
        const { userId, token } = context

        if (!userId) {
          return new ApolloError("please login")
        }
        const me = await prismaUser.user.findUnique({
          where: {
            id: userId
          }
        })
        const getUserAdvance = await prisma.userAdvance.findFirst({
          where: {
            userId: args.userId
          },

        })

        const getUserFeedback = await prisma.userFeedback.findMany({
          where: {
            userId: args.userId
          }
        })
        const getProjectMember = await prisma.projectMembers.findMany({
          where: {
            userId: args.userId
          }

        })
        const project = await prisma.project.findMany({
          where: {
            id: args.userId
          }
        })
        const numberSelfProject = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
                                                        FROM project 
                                                        WHERE author_user_id = ${userId}`
        const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' 
                                                          FROM project_members 
                                                          WHERE member_user_id=${userId}`

        me.userAdvance = getUserAdvance
        me.userFeedback = getUserFeedback
        me.projectMembers = getProjectMember
        me.project = project
        me.selfProject = _.first(numberSelfProject).number
        me.joinedProject = _.first(numberJoinProject).joined

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
            id: args.id
          },
        })
        const userAdvance = await prisma.userAdvance.findFirst({
          where: {
            userId: args.id
          }
        })
        user.userAdvance = userAdvance
        if (userAdvance) {
           
            const projectMember = await prisma.projectMembers.findMany({
                where: {
                  memberUserId: user.id
                },
              })
             const getIdProject =  _.map(projectMember, "projectId")
             const projects = await prisma.project.findMany({
              where: {
                OR:[{
                  id: {
                    in: getIdProject
                  }
                },
                {authorUserId: user.id}
              ]
              },
            })
              const selfProject = _.filter(projects, function(project) {
                    return project.authorUserId == user.id
              });
             const joinProject = await prisma.projectMembers.findMany({
                      where:{
                        memberUserId: user.id
                      },
                      include:{
                          project: true
                      }
              });
              let numberFramework = 0
              if(typeof user.userAdvance.skill[0].framework !== 'undefined'){
                   numberFramework  = (user.userAdvance.skill[0].framework).length
              }
              user.userAdvance.numberFramework = numberFramework
              user.userAdvance.selfProject = selfProject
              user.userAdvance.joinProject = joinProject
        }
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

