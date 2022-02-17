
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
import { isDataView } from 'util/types';
import projectMembersTypeDefs from '../../typeDefs/projectMembersTypeDefs';
import projectCommentMutation from '../mutation/projectCommentMutation';
import projectMembersQueries from './projectMembersQueries';

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
                console.log(projectmember)
            

            }
            return allUserAdvance
            
        }
        catch(e){           
            console.log(e)
            return new ApolloError(`${e}`)
        }
        },
  }
}