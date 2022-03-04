const { prismaUser } = require('../database')
export default{
    UserAdvance:{
        id:(parent) => parent.id,
        userId:(parent) =>(parent.userId == undefined) ? parent.user_id : parent.userId,
        roles:(parent) => (typeof parent.roles === 'string') ? JSON.parse(parent.roles) : parent.roles,
        language:(parent) => (typeof parent.language === 'string') ? JSON.parse(parent.language) : parent.language,
        skill:(parent) =>(typeof parent.skill === 'string') ? JSON.parse(parent.skill) : parent.skill,
        info:(parent) => parent.info,
        plan:(parent) => parent.plan,
        goal:(parent) => parent.goal,
        createdAt: (parent) => (parent.createdAt == undefined) ? parent.created_at : parent.createdAt,
        updatedAt: (parent) =>(parent.updatedAt == undefined)?  parent.updated_at : parent.updatedAt,
        deleted: (parent) => parent.deleted,
        user: async (parent, args) => {
          return prismaUser.user.findFirst({
            where:{
              id: +parent.userId || undefined
            }
          })
        }
      },
}