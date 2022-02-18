
import GraphQLJSON from 'graphql-type-json';
const { prisma , prismaUser , userCore} = require('../../database')
import _ = require('lodash');

export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProject: async (parent, args, context) => {
            try{
                const allProject = await  prisma.project.findMany({
                    where:{
                    deleted: null
                    },
                    include:{
                        projectLike : true,
                        projectComment: true
                    },
                    orderBy:{
                        id: "desc"
                    }
            })
            
            const getIdUser = _.map(allProject, 'authorUserId')
            const userCore = await prismaUser.user.findMany({
                where:{
                    id:{
                        in: getIdUser
                    }
                }
            })
            const users = _.keyBy(await userCore, 'id')

          for(const project of allProject){
            project.user = users[project.authorUserId]
          }
            
            return allProject
        }
        catch(e){
            console.log(e)
        }
        },
  }
}