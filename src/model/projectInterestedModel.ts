
export default{
    ProjectInterested:{
        id:(parent) => parent.id,
        projectId:(parent) => (parent.projectId === undefined) ? parent.project_id : parent.projectId,
        userId:(parent) => (parent.userId === undefined) ? parent.user_id : parent.userId,
        createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
        updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
        deleted: (parent) => parent.deleted,
      },
}
