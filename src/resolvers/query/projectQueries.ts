
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
            console.log(allProject)
            // for(const project of allProject){
            //     var member = project.member
            //     console.log(member)
            //     project.member = await prismaUser.user.findMany({
            //         where:{
            //             id: {in: member}
            //         },
            //         select:{
            //             id: true,
            //             name: true,
            //             email:true
            //         }
            //     })
            //     console.log(project.member)
            // }
            return allProject
        }
        catch(e){
            console.log(e)
        }
        },
  }
}