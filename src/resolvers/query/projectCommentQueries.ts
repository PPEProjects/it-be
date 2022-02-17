
import GraphQLJSON from 'graphql-type-json';

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
  }
}