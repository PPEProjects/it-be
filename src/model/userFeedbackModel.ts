const { prisma } = require('../database')

const querySelfProject = async (parent, args) => {
  var project = await prisma.project.findMany({
    where:{
      id: parent?.projectId|| undefined
    }
  })
  return (project.length === 0) ? null : project
}
export default{
    UserFeedback:{
        id:(parent) => parent.id,
        userId:(parent) => (parent.userId === undefined) ? parent.user_id : parent.userId,
        projectId:(parent) => (parent.projectId === undefined) ? parent.project_id : parent.projectId,
        grate:(parent) => parent.grate,
        createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
        updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
        deleted: (parent) => parent.deleted,
        project:(parent,args) => querySelfProject(parent,args)

      },
}