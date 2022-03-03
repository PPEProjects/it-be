


export default{
    Project:{
        id:(parent) => parent.id,
        name:(parent) => parent.name,
        attachments:(parent) => JSON.parse(parent.attachments),
        authorUserId:(parent) => parent.author_user_id,
        category:(parent) => parent.category,
        description:(parent) => parent.description,
        level:(parent) => parent.level,
        privacy:(parent) => parent.privacy,
        version:(parent) => parent.version,
        budget:(parent) => JSON.parse(parent.budget),
        type:(parent) => parent.type,
        salary:(parent) => JSON.parse(parent.salary),
        status:(parent) => parent.status,
        memberJoin:(parent) => JSON.parse(parent.member_join),
        is_recruit:(parent) => parent.is_recruit,
        is_involved:(parent) => parent.is_involed,
        framework:(parent) => JSON.parse(parent.framework),
        programingLanguage:(parent) => JSON.parse(parent.programing_language),
       
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
        deleted: (parent) => parent.deleted,
      },
}

