
import GraphQLJSON from 'graphql-type-json';
import userQueries from './userQueries';
const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
    allProjectComment: async (parent, args, context) => {
            console.log(args)
            try{
            const allProject = await prisma.projectComment.findMany({
                where:{
                
                    id: args.id
                  }, include:{
                      project : true
                  }
            })
            console.log(allProject)
            return allProject
        }
        catch(e){
            console.log(e)
        }
        },
        detailProjectComment: async (parent, args, context) => {
            try{
                const getUser = userQueries.Query
                const detailProjectComment = await prisma.projectComment.findMany({
                    where:{         
                            projectId: args?.projectId                  
                    }
                })
                for(const comment of detailProjectComment){
                    var userId = {"id": comment.userId}
                    var user = await getUser.detailUser(parent, userId, context)
                    comment.user = user
                }
                return detailProjectComment
            }
            catch(e){
                console.log(e)
            }
        },
  }
}