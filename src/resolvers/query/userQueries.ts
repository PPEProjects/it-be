
const _ = require('lodash')
const { prismaUser, prisma } = require('../../database')
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'
import { Prisma } from '@prisma/client'
export default {
  User:{
        id: (parent, args, context, info) => parent.id,
        // userId: (parent) => parent.userId,
        // roles: (parent) => parent.roles,
        // language: (parent) => parent.language,
        // skill: (parent) => parent.skill,
        // info: (parent) => parent.info,
        // goal: (parent) => parent.goal,
        // plan: (parent) => parent.plan,
        createdAt: (parent) => parent.createdAt,
        updatedAt: (parent) => parent.updatedAt,
        // deleted: (parent) => parent.deleted,
  },
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
      try {
        var allUser = await prismaUser.user.findMany({
          where: {
            name: {
              contains: args.name
            },
          },

        })
        if (allUser.length === 0) {
          return null
        }
        const getIdUsers = _.map(allUser, "id")
        const test = await prisma.$queryRaw`SELECT * FROM user_advance WHERE user_id IN (${Prisma.join(getIdUsers)})`
        console.log(test)
        const listUserAdvance = await prisma.userAdvance.findMany({
          where: {
            userId: {
              in: getIdUsers
            },
          }
        }) 
        const userAdvances = _.keyBy(listUserAdvance, "userId")
        const users = _.map(allUser, function (user) {
          user.userAdvance = userAdvances[user.id]
          return user
        })
        var results = users
        if (args?.roles) {
          results = _.filter(users, function (item) {
            if (item.userAdvance?.roles !== undefined) {
              var roles = item.userAdvance?.roles
              var searchRoles = roles.filter(function (str) {
                let role = str.toLowerCase()
                let search = (args.roles).toLowerCase()
                return role.indexOf(search) > -1
              })
              var checkRoles = _.isEmpty(_.intersection(roles, searchRoles))
              if (!checkRoles) {
                return item
              }
            }
          });
        }
        // console.log("test: ", results)
        // for (const user of allUser) {
        //   const { userId } = context
        //   const getUserFeedback = await prisma.userFeedback.findMany({
        //     where: {
        //       userId: userId
        //     }
        //   })
        //   const getUserAdvance = await prisma.userAdvance.findMany({
        //     where:{
        //       userId : args.userId
        //     }
        //   })

        //   user.userFeedback = getUserFeedback
        //   user.userAdvance = getUserAdvance

        // }

        // const selectroles = prisma.$queryRaw`SELECT * FROM user_advance WHERE roles LIKE '%${args.roles}%'`

        // allUser.roles = selectroles

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
        const getUserAdvance = await prisma.userAdvance.findFirst({
          where: {
            userId: userId
          },

        })

        const getUserFeedback = await prisma.userFeedback.findMany({
          where: {
            userId: userId
          }
        })
        const getProjectMember = await prisma.projectMembers.findMany({
          where: {
            memberUserId: userId
          },
          include: {
            project: true
          }
        })

        const selfProject = await prisma.project.findMany({
          where: {
            authorUserId: me.id
          },
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
        me.project = selfProject
        me.numberSelfProject = _.first(numberSelfProject).number
        me.numberJoinedProject = _.first(numberJoinProject).joined

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
        const userAdvance = await prisma.userAdvance.findFirst({
          where: {
            userId: +args.id
          }
        })
        user.userAdvance = userAdvance
        if (userAdvance) {

          const projectMember = await prisma.projectMembers.findMany({
            where: {
              memberUserId: user.id
            },
          })
          const getIdProject = _.map(projectMember, "projectId")
          const projects = await prisma.project.findMany({
            where: {
              OR: [{
                id: {
                  in: getIdProject
                }
              },
              { authorUserId: user.id }
              ]
            },
          })
          const selfProject = _.filter(projects, function (project) {
            return project.authorUserId == user.id
          });
          const joinProject = await prisma.projectMembers.findMany({
            where: {
              memberUserId: user.id
            },
            include: {
              project: true
            }
          });
          let numberFramework = 0
          if (typeof user.userAdvance.skill[0].framework !== 'undefined') {
            numberFramework = (user.userAdvance.skill[0].framework).length
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

