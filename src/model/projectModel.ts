const { prisma, prismaUser } = require('../database')

const queryUser = async (parent, args) => {
  return prismaUser.user.findFirst({
    where: {
      id: +parent.authorUserId || undefined
    }
  })
}

const queryMembers = async (parent, args) => {
  var members = await prisma.projectMembers.findMany({
    where: {
      projectId: parent.id || undefined,
      deleted: null
    }
  })
  return (members.length === 0) ? null : members
}

export default {

  Project: {
    id: (parent, args, context, info) => parent.id,
    name: (parent) => parent.name,
    authorUserId: (parent) => (parent.author_user_id === undefined)
    ? parent.authorUserId : parent.author_user_id,
    attachments: (parent) => (typeof parent.attachments === 'string')
    ? JSON.parse(parent.attachments) : parent.attachments,
    category: (parent) => parent.category,
    description: (parent) => parent.description,
    level: (parent) => parent.level,
    privacy: (parent) => parent.privacy,
    version: (parent) => parent.version,
    budget: (parent) => (typeof parent.budget === 'string')
    ? JSON.parse(parent.budget) : parent.budget,
    type: (parent) => parent.type,
    salary: (parent) => (typeof parent.salary === 'string')
    ? JSON.parse(parent.salary) : parent.salary,
    status: (parent) => parent.status,
    memberJoin: (parent) => (typeof parent.memberJoin === 'string')
    ? JSON.parse(parent.memberJoin) : parent.memberJoin,
    is_recruit: (parent) => parent.is_recruit,
    is_involved: (parent) => parent.is_involved,
    framework: (parent) => (typeof parent.framework === 'string')
    ? JSON.parse(parent.framework) : parent.framework,
    programingLanguage: (parent) => (parent.programing_language !== undefined)
    ? JSON.parse(parent.programing_language)
    : parent.programingLanguage,
    createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
    updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
    deleted: (parent) => parent.deleted,
    user: (parent, args) => queryUser(parent, args),
    members: (parent, args) => queryMembers(parent, args),
  }
}

