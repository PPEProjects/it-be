
import { ApolloError } from 'apollo-server';
import { count } from 'console';
import GraphQLJSON from 'graphql-type-json';
import { ary } from 'lodash';
import { isDataView } from 'util/types';
const _ = require('lodash')

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allUserAdvance: async (parent, args, context) => {
            try{
            
            const allUserAdvance = await prisma.userAdvance.findMany({
                where:{
                    deleted: null,
                    id: args.id
                },
            
                
            })
            for(const useradvance of allUserAdvance){
                var userid = useradvance.userId
                
                const user = prismaUser.user.findUnique({
                    where:{
                        id: userid
                    },
                })
                
                const project =  await prisma.Project.findMany({
                    where:{
                        authorUserId: userid
                    }
                })
    
                const projectmember = await prisma.ProjectMembers.findMany({
                    where:{
                        userId: userid,
                    
                    },
                    include:{
                        project: true
                    }
                })
                useradvance.user = user
                useradvance.project= project
                useradvance.projectMembers = projectmember
                
            

            }
            return allUserAdvance
            
        }
        catch(e){           
            console.log(e)
            return new ApolloError(`${e}`)
        }
        },
        detailUserAdvance: async (parent, args, context) => {
            try {
                const detailUserAdvance = await prisma.userAdvance.findMany({
                  where:{
                      userId: args.userId
                  },
                
                })
                const getUser = await prismaUser.user.findUnique({
                    where:{
                        id: args.userId
                    }
                })
                   
                const project =  await prisma.Project.findMany({
                    where:{
                        id : args.userId
                    }
                })
              
                const getprojectmember = await prisma.ProjectMembers.findMany({
                    where:{
                        userId : args.userId
                    },
                    include:{
                        project: true
                    }
                    
                })
                const getuserfeedback = await prisma.userFeedback.findMany({
                    where:{
                        userId: args.userId
                    }
                })
               
                const numberSeftIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' FROM project WHERE author_user_id = ${args.userId}`
                const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' FROM project_members WHERE user_id=${args.userId}`
                
                
                const userAdvance = _.first(detailUserAdvance)
                 const count = (userAdvance.skill[0].framework).length
                 
            
                userAdvance.user = getUser
                userAdvance.project = project
                userAdvance.projectMembers = getprojectmember
                userAdvance.userFeedback = getuserfeedback
                userAdvance.seftIdeas = _.first(numberSeftIdeas).number
                userAdvance.joinedProject = _.first(numberJoinProject).joined
                userAdvance.framework = count
                return userAdvance
            } catch (e) {
                console.log(e)
            }
        },
  }
}