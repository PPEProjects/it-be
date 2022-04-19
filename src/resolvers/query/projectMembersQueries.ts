
import { ApolloError } from 'apollo-server';
import GraphQLJSON from 'graphql-type-json';
const _ = require('lodash')

const { prisma, prismaUser } = require('../../database')


export default {
    JSON: GraphQLJSON,

    Query: {
        allProjectMembers: async (parent, args, context) => {
            try {
                const allProjectMembers = await prisma.projectMembers.findMany({
                    where: {

                        deleted: null,
                    }
                })
                return allProjectMembers
            }
            catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        detailMemberByIdProject: async (parent, args, context) => {
            try {
                const { userId } = context
                const detailMember = await prisma.projectMembers.findMany({
                    where: {
                        projectId: +args.projectId
                    },
                })
                return detailMember
            } catch (e) {
                console.log(e)
                return new ApolloError(`${e}`)
            }
        },
        detailProjectMemberByIdPm: async (parent, args, context) => {
            try {
                var { userId } = context
                if (+args?.pmUserId) {
                    userId = +args.pmUserId
                }
                const searchProjectMember = await prisma.projectMembers.findMany({
                    distinct: ['projectId'],
                    where: {
                        memberUserId: userId,
                        position: 'pm'
                    }
                })
                if (searchProjectMember.length === 0) {
                    return null
                }
                return searchProjectMember
            }
            catch (e) {
                console.log(e)
            };

        },
        detailProjectMemberByPosition: async (parent, args, context) => {
            try {
                var { userId } = context
                const searchProjectMember = await prisma.projectMembers.findMany({
                    distinct: ['projectId'],
                    where: {
                        memberUserId: userId,
                        position: args?.position
                    }
                })
                if (searchProjectMember.length === 0) {
                    return null
                }
                return searchProjectMember
            }
            catch (e) {
                console.log(e)
            };

        }
    }
}