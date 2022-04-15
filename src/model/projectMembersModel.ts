const { prismaUser, prisma } = require('../database')

const queryMemberUser = async (parent, args) => {
  var user = await prismaUser.user.findFirst({
    where: {
      id: parent?.memberUserId || undefined
    }
  })
  return parent?.memberUserId ? user : null
}
const queryUserFeedback = async (parent, args) => {
  var userFeedback = await prisma.userFeedback.findFirst({
    where: {
      userId: parent?.memberUserId || undefined,
      projectId: parent?.projectId || undefined
    }
  })
  return parent?.memberUserId ? userFeedback : null

}
const queryProject = async (parent, args) => {
  return await prisma.project.findFirst({
    where: {
      id: parent?.projectId || undefined
    }
  })
}
export default {
  ProjectMembers: {
    id: (parent) => parent.id,
    pmUserId: (parent) => (parent.pmUserId === undefined) ? parent.pm_user_id : parent.pmUserId,
    projectId: (parent) => (parent.projectId === undefined) ? parent.project_id : parent.projectId,
    roles: (parent) => (typeof parent.roles === 'string') ? JSON.parse(parent.roles) : parent.roles,
    memberUserId: (parent) => (parent.memberUserId === undefined) ? parent.member_user_id : parent.memberUserId,
    position: (parent) => parent.position,
    linkTest: (parent) => (parent.linkTest === undefined) ? parent.link_test : parent.linkTest,
    salary: (parent) => (typeof parent.salary === 'string') ? JSON.parse(parent.salary) : parent.salary,
    fee: (parent) => (typeof parent.roles === 'string') ? JSON.parse(parent.fee) : parent.fee,
    status: (parent) => parent.status,
    createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
    updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
    deleted: (parent) => parent.deleted,
    memberUser: (parent, args) => queryMemberUser(parent, args),
    userFeedback: (parent, args) => queryUserFeedback(parent, args),
    project: (parent, args) => queryProject(parent, args),
  },
}

