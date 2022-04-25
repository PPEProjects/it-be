
const _ = require('lodash')
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
const { prisma, prismaUser} = require('../../database')

export default {
    JSON: GraphQLJSON,

    Query: {
        allProject: async (parent, args, context) => {
            try {
                const listProject = await prisma.project.findMany({
                    where: {
                        deleted: null,
                        NOT: {
                            status: "pending"
                        }
                    },
                })
                let allProject = _.orderBy(listProject, ["type", "id"], ["desc", "desc"])
                return allProject

            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        myProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const myProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId,
                        type: {
                            contains: args.type
                        }
                    },
                    orderBy:{
                        updatedAt: 'desc'
                    }
                })
                return myProject
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        listJoinProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const listJoinProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId,
                        type: {
                            contains: args.contains
                        }
                    }
                })
                if (listJoinProject.length === 0) {
                    return null
                }
                const numberSelfIdeas = await prisma.projectMembers.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        memberUserId: userId
                    }
                })
                for (const project of listJoinProject) {
                    project.countProject = numberSelfIdeas._count.id

                }


                return listJoinProject

            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }

        },
       
        listInterestedProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const listInterstedProject = await prisma.project.findMany({
                    where: {
                        authorUserId: userId,
                        type: {
                            contains: args.type
                        }

                    }
                })
                const numberSelfIdeas = await prisma.projectInterested.aggregate({
                    _count: {
                        id: true
                    },
                    where: {
                        userId: userId
                    }
                })
                for (const project of listInterstedProject) {
                    project.countProject = numberSelfIdeas._count.id
                }
                if (listInterstedProject.length === 0) {
                    return null
                }
                return listInterstedProject
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },

        searchProject: async (parent, args, context) => {
            try {
                const { userId } = context
                var listProject = await prisma.project.findMany({
                    skip: args.skip,
                    take: args.take,
                    where: {
                        name: {
                            contains: args.name || undefined
                        },
                        type: {
                            contains: args.type || undefined
                        },
                        status: {
                            contains: args.status || undefined
                        },

                    },

                    orderBy: {
                        updatedAt: 'desc'
                    },
                })
                return listProject
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },

        detailProject: async (parent, args, context) => {
            try {
                const detailProject = await prisma.project.findFirst({
                    where: {
                        id: +args.id
                    },
                })
                if (detailProject === null) {
                    return null
                }
                const projectlike = await prisma.projectLikes.findMany({
                    where:{
                        projectId : +args.id,
                    }

                }) 
                const projectIntersted = await prisma.projectInterested.findMany({
                    where:{
                        projectId: +args.id,
                    }
                })
                detailProject.numberLikes = projectlike.length
                detailProject.numberInterested = projectIntersted.length
                return detailProject
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        adminProject: async (parent, args, context) => {
            try {
                const listProject = await prisma.project.findMany({
                    where: {
                        id: args.id,
                        name: {
                            contains: args.name || undefined
                        },
                        type: {
                            contains: args.type || undefined
                        },
                        status: {
                            contains: args.status || undefined
                        },
                    },
                })
                if (listProject.length === 0) {
                    return null
                }

                let allProject = _.orderBy(listProject, ["updatedAt"], ["desc"])

                const getIdUser = _.map(allProject, 'authorUserId')
                const userCore = await prismaUser.user.findMany({
                    where: {
                        id: {
                            in: getIdUser
                        }
                    },
                })
                const users = _.keyBy(await userCore, 'id')
                const numberSelfIdeas = await prisma.$queryRaw`SELECT  project_id ,COUNT(project_id) as number 
                                                                FROM project_interested WHERE project_id  
                                                                GROUP BY project_id`
                var interested = _.keyBy(numberSelfIdeas, "project_id")

                allProject.forEach(project => {
                    project.user = users[project.authorUserId]
                    const number = (interested[project.id]?.number) ? interested[project.id]?.number : 0
                    project.countProject = number

                });
                if (args?.arrange == "countProject") {
                    allProject = _.orderBy(listProject, ["countProject"], ["desc"])
                }
                return allProject
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },


    }
}