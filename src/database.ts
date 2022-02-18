import {  PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaUserCore } from '../prisma/generator/clientUserCore'

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

module.exports = {
    prisma,
    prismaUser,
}
