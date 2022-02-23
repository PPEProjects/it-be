import { ApolloError } from 'apollo-server';
import { count } from 'console';

import { ary } from 'lodash';
import { isDataView } from 'util/types';
const _ = require('lodash')
import GraphQLJSON from 'graphql-type-json';
import { sum } from 'lodash';
const { prisma, prismaUser, userCore } = require('../../database')
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
                const { userId } = context
                const me = await prismaUser.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                const myProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId,
                        type: args.type
                    }
                })
                const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
                                                                FROM project 
                                                                WHERE 
                                                                type= 'project'
                                                               `
                for (const project of myProject) {
                    project.user = me
                    project.countProject = _.first(numberSelfIdeas).number
                }

                return myProject
            } catch (e) {
                console.log(e)
            }
        },
        listJoinProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const me = await prismaUser.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                const listJoinProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId
                    }
                })
                const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' 
                                                                  FROM project_members 
                                                                  WHERE member_user_id=${userId}`
                for (const project of listJoinProject) {
                    project.user = me
                    project.countProject = _.first(numberSelfIdeas).joined

                }


                return listJoinProject

            } catch (e) {
                console.log(e)

            }

        },
        listInterestedProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const me = await prismaUser.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                const listInterstedProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId
                    }
                })
                const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as "number" FROM project_interested WHERE user_id=${userId}`
                for (const project of listInterstedProject) {
                    project.user = me
                    project.countProject = _.first(numberSelfIdeas).number

                }

                return listInterstedProject

            } catch (e) {
                console.log(e)

            }

        },
        myIdeas: async (parent, args, context) => {
            try {
                const { userId } = context
                const me = await prismaUser.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                const myIdeas = await prisma.project.findMany({
                    where: {
                        authorUserId: userId,
                        type: args.type
                    }
                })
                const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
                                                                FROM project WHERE type = 'ideas'`
                for (const project of myIdeas) {
                    project.user = me
                    project.countProject = _.first(numberSelfIdeas).number
                }

                return myIdeas
            } catch (e) {
                console.log(e)
            }
        },


    }
}