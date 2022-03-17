import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'
import { ary, countBy, create, forEach, isElement, isNull } from 'lodash';
import { log } from 'console';
import _ = require('lodash');
import projectMembersQueries from '../query/projectMembersQueries';



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectMembers: async (parent, args, context,) => {

      try {
        const { userId } = context
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const user = await prismaUser.user.findUnique({
          where: { id: getUserId }
        })
        const createProjectMembers = await prisma.projectMembers.create({
          data: {
            ...args.data,
            memberUserId: +args.data?.memberUserId || undefined,
            projectId: +args.data?.projectId,
            pmUserId: getUserId
          },
        })
        createProjectMembers.user = user
        return createProjectMembers
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    createProjectMembersUserIds: async (parent, args, context,) => {

      try {
        const { userId } = context
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const member = args.data.memberUserId
        let createProjectMembers = {}
        for (const element of member) {
          createProjectMembers = await prisma.projectMembers.create({
            data: {
              ...args.data,
              memberUserId: +element,
              projectId: +args.data?.projectId,
              pmUserId: getUserId
            },
          })
        }
        return createProjectMembers

      }

      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateProjectMembers: async (parent, args, context,) => {
      try {
        const id = +args.data.id
        delete (args.data)['id']
        const updateProjectMembers = await prisma.projectMembers.update({
          where: {
            id: id
          },
          data: {
            ...args.data,
            memberUserId: +args.data?.memberUserId
          }
        })
        return updateProjectMembers
      }
      catch (e) {
        console.log(e)
      }
    },
    upsertProjectMembers: async (parent, args, context,) => {
      try {
        const { userId } = context
        var getUserId = userId
        if (args.data.userId) {
          getUserId = +args.data.userId
        }
        const user = await prismaUser.user.findUnique({
          where: { id: getUserId }
        })
        const projectMember = await prisma.projectMembers.findFirst({
          where: {
            memberUserId: +args.data.memberUserId,
            projectId: +args.data.projectId
          }

        })
        if (projectMember.length === 0) {
          const createProjectMembers = await prisma.projectMembers.create({
            data: [{
              ...args.data,
              memberUserId:
                +args.data?.memberUserId,

              projectId: +args.data?.projectId,
              pmUserId: getUserId
            }],
            skipDuplicates: true,

          })
          return createProjectMembers
        }
        const updateProjectMembers = await prisma.projectMembers.update({
          where: {
            id: projectMember.id
          },
          data: {
            ...args.data,
            memberUserId: +args.data?.memberUserId,
            projectId: +args.data?.projectId,
            pmUserId: getUserId
          },
        })
        return updateProjectMembers
      } catch (e) {
        console.log(e)

      }
    },

    deleteProjectMembers: async (parent, args, content,) => {
      try {
        const now = new Date()
        const deleteProjectMembers = await prisma.projectMembers.update({
          where: {
            id: +args.id
          },
          data: {
            deleted: now
          }
        })
        return true
      }
      catch (e) {
        console.log(e)
      }
    },

  }
}





