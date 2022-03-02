
export default{
    UserAdvance:{
        id:(parent) => parent.id,
        userId:(parent) => parent.user_id,
        roles:(parent) => JSON.parse(parent.roles),
        language:(parent) => JSON.parse(parent.language),
        skill:(parent) => JSON.parse(parent.skill),
        info:(parent) => parent.info,
        plan:(parent) => parent.plan,
        goal:(parent) => parent.goal,
        createdAt: (parent) => parent.created_at,
        updatedAt: (parent) => parent.updated_at,
      },
}