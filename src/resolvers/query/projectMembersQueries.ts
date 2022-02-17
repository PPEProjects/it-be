
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProjectMembers: async (parent, args, context) => {
            try{
            const allProjectMembers = await prisma.projectMembers.findMany({
                where:{
                    id: args.id
                  }, include:{
                      project : true
                    
                  }
                  
            
            })
            return allProjectMembers
        }
        catch(e){
            console.log(e)
        }
        },
  }
}