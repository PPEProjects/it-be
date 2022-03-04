
const { prismaUser, prisma } = require('../database')

const queryUser = async (parent, args) => {
  return prismaUser.user.findFirst({
    where: {
      id: +parent.userId || undefined
    }
  })
}

const querySelfProject = async (parent, args) => {
  var project = await prisma.project.findMany({
    where: {
      authorUserId: parent?.userId || undefined
    }
  })
  return (project.length === 0) ? null : project
}

const queryJoinProject = async (parent, args) => {
  var joinProject = await prisma.projectMembers.findMany({
    where: {
      memberUserId: parent?.userId || undefined
    }
  })
  return (joinProject.length === 0) ? null : joinProject
}

export default {
  UserAdvance: {
    id: (parent) => parent.id,
    userId: (parent) => (parent.userId == undefined) ? parent.user_id : parent.userId,
    roles: (parent) => (typeof parent.roles === 'string') ? JSON.parse(parent.roles) : parent.roles,
    language: (parent) => (typeof parent.language === 'string') ? JSON.parse(parent.language) : parent.language,
    skill: (parent) => (typeof parent.skill === 'string') ? JSON.parse(parent.skill) : parent.skill,
    info: (parent) => parent.info,
    plan: (parent) => parent.plan,
    goal: (parent) => parent.goal,
    createdAt: (parent) => (parent.createdAt == undefined) ? parent.created_at : parent.createdAt,
    updatedAt: (parent) => (parent.updatedAt == undefined) ? parent.updated_at : parent.updatedAt,
    deleted: (parent) => parent.deleted,
    user: (parent, args) => queryUser(parent, args),
    selfProject: (parent, args) => querySelfProject(parent, args),
    joinProject: (parent, args) => queryJoinProject(parent, args),
  },
}