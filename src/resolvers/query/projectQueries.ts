
import GraphQLJSON from 'graphql-type-json';
import { sum } from 'lodash';
const { prisma, prismaUser, userCore } = require('../../database')
import _ = require('lodash');
import { isArrayBufferView } from 'util/types';

export default {
    JSON: GraphQLJSON,

    Query: {
        allProject: async (parent, args, context) => {
            try {
                const listProject = await prisma.project.findMany({
                    where: {
                        deleted: null
                    },
                })
                let allProject = _.orderBy(listProject, ["type", "id"], ["desc", "desc"])

                const getIdUser = _.map(allProject, 'authorUserId')
                const userCore = await prismaUser.user.findMany({
                    where: {
                        id: {
                            in: getIdUser
                        }
                    },
                })
                const users = _.keyBy(await userCore, 'id')

                for (const project of allProject) {
                    project.user = users[project.authorUserId]
                }

                return allProject
            
            }
            catch (e) {
                console.log(e)
            }
        },
        myProject: async (parent, args, context) => {
            try {
                const { userId }= context
                const me = await  prismaUser.user.findUnique({
                    where:{
                        id: userId
                    }
                })
                const myProject = await prisma.project.findMany({
                    where:{
                        authorUserId: userId
                    }
                })
                for(const project of myProject){
                    project.user = me
                }
                return myProject
            } catch (e) {
                console.log(e)
            }
        },
    }
}