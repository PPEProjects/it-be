
export default{
    UserFeedback:{
        id:(parent) => parent.id,
        userId:(parent) => parent.user_id,
        projectId:(parent) => parent.project_id,
        grate:(parent) => parent.grate,
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
        deleted: (parent) => parent.deleted_at,
      },
}