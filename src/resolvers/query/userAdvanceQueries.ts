
import { ApolloError } from 'apollo-server';
import { convertNodeHttpToRequest } from 'apollo-server-core';
import { count } from 'console';
import { getOperationAST } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { get } from 'http';
import { ary } from 'lodash';
import { getgroups } from 'process';
import { isDataView } from 'util/types';
const _ = require('lodash')
const { prisma, prismaUser } = require('../../database')
import * as bcrypt from 'bcryptjs'
import axios from 'axios'



export default {
    JSON: GraphQLJSON,

    Query: {
        allUserAdvance: async (parent, args, context) => {
            try {

                const allUserAdvance = await prisma.userAdvance.findMany({
                    where: {
                        deleted: null,
                    },
                })
                // for (const userAdvance of allUserAdvance) {
                //     var userId = userAdvance.userId

                //     const project = await prisma.Project.findMany({
                //         where: {
                //             authorUserId: userId
                //         }
                //     })

                //     const projectMember = await prisma.projectMembers.findMany({
                //         where: {
                //             pmUserId: userId || undefined,

                //         }
                //     })
                //     const getUserFeedback = await prisma.userFeedback.findMany({
                //         where: {
                //             userId: userId || undefined,
                //         }
                //     })
                //     // userAdvance.user = user
                //     userAdvance.project = project
                //     userAdvance.projectMembers = projectMember
                //     userAdvance.userFeedback = getUserFeedback



                // }
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
                        userId: +args.userId
                    },
                })
                // const getUser = await prismaUser.user.findFirst({
                //     where: {
                //         id: +args.userId
                //     }
                // })
                // if(getUser === null){
                //     return null
                // }

                // const project = await prisma.Project.findMany({
                //     where: {
                //         id: +args.userId
                //     }
                // })

                // const getProjectMember = await prisma.projectMembers.findMany({
                //     where: {
                //         memberUserId: +args.userId
                //     }
                // })

                // const getUserFeedback = await prisma.userFeedback.findMany({
                //     where: {
                //         userId: +args.userId
                //     }
                // })

                // detailUserAdvance.user = getUser
                // detailUserAdvance.selfProject = project
                // detailUserAdvance.joinProject = getProjectMember
                // detailUserAdvance.userFeedback = getUserFeedback


                // const numberSelfIdeas = await prisma.$queryRaw`SELECT COUNT(id) as 'number' 
                //                                                 FROM project 
                //                                                 WHERE author_user_id = ${+args.userId}`
                const numberSelfIdeas = await prisma.project.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        authorUserId: +args.userId
                    }

                })
                console.log(numberSelfIdeas)
                // const numberJoinProject = await prisma.$queryRaw`SELECT COUNT(id) as 'joined' 
                //                                                     FROM project_members 
                //                                                     WHERE pm_user_id=${+args.userId}`
                const numberJoinProject = await prisma.projectMembers.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        memberUserId: +args.userId
                    }
                })
                //  const numberAvg = await prisma.$queryRaw`SELECT AVG(grate) as number FROM user_feedback 
                //                                                     WHERE user_id= ${+args.userId}` 
                const numberAvg = await prisma.userFeedback.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        userId: +args.userId
                    }
                })


                // const userAdvance = detailUserAdvance
                // if (userAdvance) {              
                detailUserAdvance.numberSelfIdeas = numberSelfIdeas._count.id
                detailUserAdvance.numberJoinedProject = numberJoinProject._count.id
                detailUserAdvance.numberAvggrate = numberAvg._count.id
                // }

                return detailUserAdvance
            } catch (e) {
                console.log(e)
            }
        },
    }
}