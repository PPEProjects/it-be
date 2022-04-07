const { prisma,prismaUser} = require('../database')
const queryMemberUser = async (parent, args) => {
  var user = await prismaUser.user.findFirst({
    where: {
      id: parent?.memberUserId || undefined
    }
  })
  return parent?.memberUserId ? user : null
}
const queryProject = async (parent, args) => {
  var project = await prisma.project.findFirst({
    where: {
      id: parent?.projectId || undefined
    }
  })
  return (!project) ? null : project
}
export default {
  ProjectInterested: {
    id: (parent) => parent.id,
    projectId: (parent) => (parent.projectId === undefined) ? parent.project_id : parent.projectId,
    userId: (parent) => (parent.userId === undefined) ? parent.user_id : parent.userId,
    createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
    updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
    deleted: (parent) => parent.deleted,
    project:(parent,args) => queryProject(parent,args),
    memberUser:(parent,args)=>queryMemberUser(parent,args)
  },
}
