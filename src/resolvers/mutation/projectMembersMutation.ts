import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import _ = require('lodash');
import userAdvanceMutation from './userAdvanceMutation';


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
    upsertProjectMembersUserIds: async (parent, args, context,) => {

      try {
        const { userId } = context
        var getUserId = userId
        if (args?.data?.userId) {
          getUserId = +args.data.userId
        }
        const member = (args.data?.memberUserId)?.map(Number)
        if(member?.length == 0  || !member){
            return null
        }
        const checkMember = await prisma.projectMembers.findMany({
            where:{
              memberUserId:{
                in: member
              },
              projectId: +args.data.projectId
            }
        })
        const userAdvances = await prisma.userAdvance.findMany({
            where:{
              userId:{
                in: member
              }
            },
        })
        const setKeyUserAdvances = _.keyBy(userAdvances, 'userId')
        for(const userId of member){
          var checkRoles = (setKeyUserAdvances[userId]?.roles ? setKeyUserAdvances[userId]?.roles : [])
                            .filter(value => [args?.data?.position].includes(value))
          if(checkRoles.length){
            continue;
          }
          userAdvanceMutation?.
          Mutation?.
          addAsPosition(parent, {'roles': args?.data?.position, 'userId': userId}, context)
        }
        
        const setKey = _.keyBy(checkMember, 'memberUserId')
        
        const getIdMembers = _.map(checkMember, 'memberUserId')
        
        var projectMembers = new Array()
        for(const memberId of member) {
          if(getIdMembers.includes(memberId) || args?.id)
          {
            var idProjectMember = setKey[memberId]?.id
            if(args?.id){
              idProjectMember = args.id
            }
            const updateProjectMembers = await prisma.projectMembers.update({
              where:{
               id: idProjectMember
              },
              data: {
                ...args.data,
                memberUserId: +memberId,
                projectId: +args?.data?.projectId,
                pmUserId: getUserId
              },
            })
            projectMembers.push(updateProjectMembers)
          }
          else{
            const createProjectMembers = await prisma.projectMembers.create({
            data: {
              ...args.data,
              memberUserId: +memberId,
              projectId: +args.data?.projectId,
              pmUserId: getUserId
            },
          })
          projectMembers.push(createProjectMembers)
        }
        }
        return projectMembers

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
        const projectMember = await prisma.projectMembers.findFirst({
          where: {
            memberUserId: +args.data?.memberUserId || 0,
            projectId: +args.data?.projectId,
          }
        })
        if (projectMember === null) {
          const createProjectMembers = await prisma.projectMembers.create({
            data: {
              ...args.data,
              memberUserId: +args.data?.memberUserId || undefined,
              projectId: +args.data?.projectId,
              pmUserId: getUserId,
            },
      

          })
          return createProjectMembers
        }
        const updateProjectMembers = await prisma.projectMembers.update({
          where: {
            id: projectMember.id
          },
          data: {
            ...args.data,
            memberUserId: +args.data?.memberUserId || undefined,
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
        const deleteProjectMembers = await prisma.projectMembers.delete({
          where: {
            id: +args.id
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





