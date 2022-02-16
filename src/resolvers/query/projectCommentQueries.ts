
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProjectComment: async (parent, args, context) => {
            try{
            const allProject = await prisma.projectLike.findMany({
                where:{
                    projectId: args.projectId
                }
            })
            return allProject
        }
        catch(e){
            console.log(e)
        }
        },
  }
}