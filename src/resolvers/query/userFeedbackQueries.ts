
import GraphQLJSON from 'graphql-type-json';
import _ = require('lodash');

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allUserFeedback: async (parent, args, context) => {
            try{
            var allUserFeedback = await prisma.userFeedback.findMany({
                where:{
                    deleted: null,
                    id: args.id
                },               
            })
            // const getProjectId = _.map(allUserFeedback, 'projectId')
            // const projects = await prisma.project.findMany({
            //     where:{
            //         id:{
            //             in: getProjectId
            //         }
            //     }
            // })
            // const setKeyProjects = _.keyBy(projects, 'id')
            // allUserFeedback = _.map(allUserFeedback, function(userFeedback){
            //     userFeedback.project = setKeyProjects[userFeedback.projectId]
            //     return userFeedback
            // })
            return allUserFeedback
        }
        catch(e){
            console.log(e)
        }
        },
  }
}