
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allUserFeedback: async (parent, args, context) => {
            try{
            const allUserFeedback = await prisma.userFeedback.findMany({
                where:{
                    
                    deleted: null,
                    id: args.id
                },
                include:{
                    project : true
                }
                
            })
            return allUserFeedback
        }
        catch(e){
            console.log(e)
        }
        },
  }
}