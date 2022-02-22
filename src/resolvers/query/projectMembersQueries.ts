

import { ApolloError } from 'apollo-server';
import { count } from 'console';
import GraphQLJSON from 'graphql-type-json';
import { ary, cond } from 'lodash';
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
                  for(const projectmembers of allProjectMembers){
                    var projectid = projectmembers.id
                    
                    const project =  await prisma.project.findMany({
                        where:{
                            id: projectid
                        }
                    })
                    projectmembers.project = project
                
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
                    const projectMembers = _.first(detailMember)
                    projectMembers.project = project
                  
                    return projectMembers
                } catch (e) {
                    console.log(e)
                }
        },
  }
}