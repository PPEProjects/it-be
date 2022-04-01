import {  PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaUserCore } from '../prisma/generator/clientUserCore'
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
prisma.$use(async (params, next) => {
    // Check incoming query type
    if(params.action == "delete" && params.model !== "ProjectLikes" && params.model !== "ProjectInterested"){ 
            const now = new Date()
            params.action = "update"
            params.args["data"] = { deleted: now }
    }            
    if(params.action == "findMany"){
        if(params.args.where){
            params.args.where.deleted =  null
        }
        else{
            params.args["where"] = {deleted: null}
        }
    }
    if(params.action == "findFirst" || params.action == "findUnique"){
        params.action = "findFirst"
        params.args.where.deleted = null
    }
    
    return next(params)
  });

module.exports = {
    prisma,
    prismaUser,
}
