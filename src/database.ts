import {  PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaUserCore, User } from '../prisma/generator/clientUserCore'
import _ = require('lodash');
const prisma = new PrismaClient({
    datasources:{
        db:{
            url: process.env.DATABASE_URL_IT_SQUARE
        }
    }
})
const prismaUser = new PrismaUserCore({
    datasources:{
        db:{
            url: process.env.DATABASE_URL_USER
        }
    }
})
const getUsers = async (userIds)=>{
    const users = await prismaUser.user.findMany({
        where:{
            id:{
                in: userIds
            }
        },
    })
    const getUsers = _.keyBy(users, "id")
    return getUsers
}
module.exports = {
    prisma,
    prismaUser,
    getUsers
}
