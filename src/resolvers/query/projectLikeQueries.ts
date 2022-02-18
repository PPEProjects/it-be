
import axios from 'axios';
import GraphQLJSON from 'graphql-type-json';

const { prisma , prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,
   
  Query: {
        allProjectLike: async (parent, args, context) => {
            try{
            const allProject = await prisma.projectLike.findMany({
                where:{
                  id: args.id
                }, include:{
                    project : true
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