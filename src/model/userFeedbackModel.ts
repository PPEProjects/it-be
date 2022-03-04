
export default{
    UserFeedback:{
        id:(parent) => parent.id,
        userId:(parent) => (parent.userId === undefined) ? parent.user_id : parent.userId,
        projectId:(parent) => (parent.projectId === undefined) ? parent.project_id : parent.projectId,
        grate:(parent) => parent.grate,
        createdAt: (parent) => (parent.created_at === undefined) ? parent.createdAt : parent.created_at,
        updatedAt: (parent) => (parent.updated_at === undefined) ? parent.updatedAt : parent.updated_at,
        deleted: (parent) => parent.deleted,
      },
}