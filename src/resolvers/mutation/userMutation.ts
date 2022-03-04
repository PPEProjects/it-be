
// const { prisma } = require('../../database')
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server'
import axios from 'axios'
const { prismaUser } = require("../../database")
const prisma = prismaUser
export default {
  Mutation: {
    signupUser: async (parent, args, context) => {
      try {
        const checkEmail = await prisma.user.findUnique({
          where:{
            email: args.data.email
          }
        })
        if(checkEmail){
          return new ApolloError("email is already exits.")
        }

        if(args.data.password != args.data.password_confirmation){
          return new ApolloError("the password not confirm.")
        }
        const register = await prismaUser.user.create(
        { 
          data:{
           name: args.data.name,
           email: args.data.email,    
           password: args.data.password
          }
         })
        const user = register
        const getToken = await axios.get(`${process.env.URL_SMILE_EYE_API}/return-token`, 
          {
            params:{
                id: register.id
            }
          }
          );
        const token = getToken.data
        return {
          token,
          user,
        }
      }
      catch (e) {
        console.log(e)
        return new ApolloError(`${e}`)
      }
    },
    signupLocalUser: async(parent, args, context) =>{
      try {
        const checkEmail = await prisma.user.findUnique({
          where:{
            email: args.data.email
          }
        })
        if(checkEmail){
          return new ApolloError("email is full of ears")
        }
        
        const postData = args.data.posts?.map((post) => {
          return { title: post.title, content: post.content || undefined }
        })
        if(args.data.password != args.data.password_confirmation){
          return new ApolloError("password in correct ")
        }
        const password = await bcrypt.hash(args.data.password, 10)
        const user = await prisma.user.create({
          data: {
            name: args.data.name,
           email: args.data.email,    
            password,
            roles:["user"]
          },
        })
        const token = jwt.sign({ userId: user.id }, `${process.env.APP_SECRET}`)
        return {
          token,
          user,
        }
      }
      catch (e) {
        console.log(e)
      }

  }
  }
  }