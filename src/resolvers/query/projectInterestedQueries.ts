
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProjectInterested: async (parent, args, context) => {
            try{
                console.log(args)
            const allProjectInterested = await prisma.projectInterested.findMany({
                where:{
                  id: args.id
                }, include:{
                    project : true
                }
                
            })
            return allProjectInterested
        }
        catch(e){
            console.log(e)
        }
        },
  }
}