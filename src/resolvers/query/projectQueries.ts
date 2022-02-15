
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProject: async (parent, args, context) => {
            try{
            const allProject = await prisma.project.findMany({
                where:{
                    deleted: null
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