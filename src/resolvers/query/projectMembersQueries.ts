
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
        detailMemberByIdProject: async (parent, args, context) => {
                try {
                    const detailMember = await prisma.projectMembers.findMany({
                        where:{
                            projectId: args.projectId
                        }
                    })
                    return detailMember
                } catch (e) {
                    console.log(e)
                }
        },
  }
}