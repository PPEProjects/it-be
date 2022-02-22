

import { ApolloError } from 'apollo-server';
import { count } from 'console';
import GraphQLJSON from 'graphql-type-json';
import { ary, cond, values } from 'lodash';
import { isDataView } from 'util/types';
import projectQueries from './projectQueries';
const _ = require('lodash')

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProjectMembers: async (parent, args, context) => {
            try{
            const allProjectMembers = await prisma.projectMembers.findMany({
                where:{
                         
                    deleted: null,
                    id: args.id
                  }, 
            })
                  for(const projectMembers of allProjectMembers){
                    var projectId = projectMembers.id
                    
                    const project =  await prisma.project.findMany({
                        where:{
                            id: projectId
                        }
                    })
                    projectMembers.project = project
                
                }

            return allProjectMembers
        }
        catch(e){
            console.log(e)
        }
        },
        detailMemberByIdProject: async (parent, args, context) => {
                try {
                    const detailMember = await prisma.projectMembers.findMany({
                        where:{
                            projectId: args.projectId
                        }
                    })
                    const project =  await prisma.Project.findFirst({
                        where:{
                             id: args.id
                        }
                    })
                    var getIdMembers = _.map(detailMember, "memberUserId")
                    getIdMembers = _.xor(getIdMembers, [null])
                    const members = await prismaUser.user.findMany({
                        where:{
                            id:{
                                in: getIdMembers
                            }
                        }
                    })
                    const setKeyMembers = _.keyBy(members, "id")
                    const projectMembers = _.map(detailMember, (projectMember, index)  => {
                            projectMember.project = project
                            projectMember.memberUser = setKeyMembers[projectMember.memberUserId]
                            return projectMember
                    })
                  
                    return projectMembers
                } catch (e) {
                    console.log(e)
                }
        },
  }
}