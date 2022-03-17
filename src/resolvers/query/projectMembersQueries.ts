
import { triggerAsyncId } from 'async_hooks';
import { typeFromAST } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { toArray } from 'lodash';
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
                const getIdMember = _.difference(_.map(detailMember, 'memberUserId'), [null])
                const userFeedback = await prisma.userFeedback.findMany({
                    where: {
                        userId: {
                            in: getIdMember
                        },
                        projectId: +args.projectId
                    }
                })
                const setKeyUserFeedback = _.keyBy(userFeedback, "userId")
                _.map(detailMember, (member) => {
                    member.userFeedback = setKeyUserFeedback[member.memberUserId]
                    return member
                })
                return detailMember
            } catch (e) {
                console.log(e)
            }
        },
        detailProjectMemberByIdPm: async (parent, args, context) => {
            try {
                const searchProjectMember = await prisma.projectMembers.findMany({
                    distinct: ['projectId'],
                    where: {
                        pmUserId: +args.pmUserId
                    }
                })
                if (searchProjectMember.length === 0) {
                    return null
                }


                // if(searchProjectMember === null){
                //     return null     
                // }
                // var query = `SELECT * FROM project_members WHERE pm_user_id = ${args.pmUserId} GROUP BY project_id;`
                // // var query = `SELECT project_id FROM project_members WHERE pm_user_id = ${args.pmuserId}`
                // // console.log(query)
                // const searchProjectMember = await prisma.$queryRawUnsafe(query)
                return searchProjectMember
            }
            catch (e) {
                console.log(e)
            };

        }

    }
}