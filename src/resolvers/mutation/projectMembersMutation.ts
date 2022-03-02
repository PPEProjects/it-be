import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')
import { DateTimeResolver } from 'graphql-scalars'
import { ary } from 'lodash';



export default {
  JSON: GraphQLJSON,

  Mutation: {
    createProjectMembers: async (parent, args, context,) => {
  
      try {
        const { userId } = context
        var getUserId = userId
        if(args.data.userId){
          getUserId = args.data.userId
        }
        const user = await prismaUser.user.findUnique({
              where:{ id: getUserId}
          })
        const createProjectMembers = await prisma.projectMembers.create({
          data: {
            ...args.data,
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
    updateProjectMembers: async (parent, args, context,) =>{
      try{
        const id = +args.data.id
        delete (args.data)['id']
        const updateProjectMembers= await prisma.projectMembers.update({
            where:{
              id: id
            },
            data:{
              ...args.data,
              memberUserId: +args.data?.memberUserId
            }
        })
        return updateProjectMembers
      }
      catch(e){
        console.log(e)
      }
    },
    upsertProjectMembers: async (parent, args, context,) =>{
      try {
        
        const upsertProjectMembers= await prisma.projectMembers.upsert({
          where:{
           memberUserId: +args.data.memberUserId
          },
          update:{
            ...args.data,
          },
          create:{
            ...args.data,
          }
        
      })
      return upsertProjectMembers
        
      } catch (e) {
        console.log(e)
        
      }
    },

    deleteProjectMembers: async (parent, args, content,) =>{
      try{
        const now = new Date()
        const deleteProjectMembers= await prisma.projectMembers.update({
            where:{
              id: +args.id 
            },
            data:{
              deleted: now
            }
        })
        return true
      }
      catch(e){
        console.log(e)
      }
    },

    }
}





