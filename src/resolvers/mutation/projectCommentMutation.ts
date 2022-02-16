import { ApolloError } from 'apollo-server'
import GraphQLJSON from 'graphql-type-json';
const { prisma } = require('../../database')
const { prismaUser } = require('../../database')



export default {
//   JSON: GraphQLJSON,
  Mutation: {
    createProjectComment: async (parent, args, context,) => {
        console.log("sda")
        return 123;
      try {
          console.log("sda")
        const { userId } = context
        const user = await prismaUser.user.findUnique({
              where:{ id: userId}
          })
          console.log(args.data)
        // const createProjectComment= await prisma.projectComment.create({
        //   data: {
        //     ...args.data ,
        //     userId: userId
        //   },
        // })
        return null
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)

      }
    },
    updateProjectComment: async (parent, args, content,) =>{
      try{
        const updateProjectComment = await prisma.allProjectComment.update({
            where:{
              id: args.id 
            },
            data:{
              ...args.data
            }
        })
        return updateProjectComment
      }
      catch(e){
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },
    deleteProject: async (parent, args, content,) =>{
        try{
          const now = new Date()
          const deleteProjectComment = await prisma.allProjectComment.update({
              where:{
                id: args.id 
              },
              data:{
                deleted: now
              }
          })
          return true
        }
        catch(e){
          console.log(e)
        }
      },

    }
}





// https://github.com/PPEProjects/it-be.git

// git remote set-url origin  https://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@github.com/PPEProjects/it-be.git