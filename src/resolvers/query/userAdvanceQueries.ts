
import { ApolloError } from 'apollo-server';
import { count } from 'console';
import GraphQLJSON from 'graphql-type-json';
import { ary } from 'lodash';
import { isDataView } from 'util/types';
const _ = require('lodash')

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allUserAdvance: async (parent, args, context) => {
            try {

                const allUserAdvance = await prisma.userAdvance.findMany({
                    where: {
                        deleted: null,
                        id: args.id
                    },


                })
                for (const userAdvance of allUserAdvance) {
                    var userId = userAdvance.userId

                    const user = prismaUser.user.findUnique({
                        where: {
                            id: userId
                        },
                    })

                    const project = await prisma.Project.findMany({
                        where: {
                            authorUserId: userId
                        }
                    })

                    const projectMember = await prisma.projectMembers.findMany({
                        where: {
                            pmUserId: userId || undefined,

                        }
                    })
                    userAdvance.user = user
                    userAdvance.project = project
                    userAdvance.projectMembers = projectMember



                }
                return allUserAdvance

            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        detailUserAdvance: async (parent, args, context) => {
            try {
                const detailUserAdvance = await prisma.userAdvance.findFirst({
                    where: {
                        userId: args.userId
                    },

                })
                for (const userAdvanceall of detailUserAdvance) {
                    const getUser = await prismaUser.user.findMany({
                        where: {
                            id: args.userId
                        }
                    })

                    const project = await prisma.Project.findMany({
                        where: {
                            id: args.userId
                        }
                    })
                    console.log(project)
                    const getProjectMember = await prisma.projectMembers.findMany({
                        where: {
                            pmUserId: args.userId
                        }

                    })
                    const getUserFeedback = await prisma.userFeedback.findMany({
                        where: {
                            userId: args.userId
                        }
                    })
                    userAdvanceall.user = getUser
                    userAdvanceall.selfProject = project
                    userAdvanceall.joinProject = getProjectMember
                    userAdvanceall.userFeedback = getUserFeedback




                }


                const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
                                                                FROM project 
                                                                WHERE author_user_id = ${args.userId}`
                const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' 
                                                                    FROM project_members 
                                                                    WHERE pm_user_id=${args.userId}`


                const userAdvance = detailUserAdvance
                if (userAdvance) {
                    const count = (userAdvance.skill[0].framework) ? (userAdvance.skill[0].framework).length : 0
                    userAdvance.numberSelfIdeas = _.first(numberSelfIdeas).number
                    userAdvance.numberJoinedProject = _.first(numberJoinProject).joined
                    userAdvance. numberFramework = count
                }

                return userAdvance
            } catch (e) {
                console.log(e)
            }
        },
    }
}