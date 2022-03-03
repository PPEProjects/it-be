
export default{
    ProjectInterested:{
        id:(parent) => parent.id,
        projectId:(parent) => parent.project_id,
        userId:(parent) => parent.user_id,
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
        deleted: (parent) => parent.deleted,
      },
}
