
export default{
    ProjectMembers:{
        id:(parent) => parent.id,
        pmUserId:(parent) => parent.pm_user_id,
        projectId:(parent) => parent.project_id,
        roles:(parent) => JSON.parse(parent.roles),
        memberUserId:(parent) => parent.member_user_id,
        position:(parent) => parent.position, 
        // linKTest:(parent) => parent.link_test,
        salary:(parent) =>  JSON.parse(parent.salary),
        fee:(parent) => JSON.parse(parent.fee),
        status:(parent) => parent.status,
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
        deleted: (parent) => parent.deleted,
      },
}

