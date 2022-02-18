import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload!
  }

  type Query {
    allUsers: [User!]!
    signIn(email: String!, password: String!): AuthPayload!
    me: User!
    detailUser(id: Int): User 
  }

  type User {
    email: String!
    id: Int!
    name: String
    password: String
    roles: JSON
    first_name: String
    phone_number:             String
    username:                 String
    role_label:               String  
    is_flag:                  Boolean
    quotes:                   String  
    avatar_attachment_id:    JSON
    background_attachment_id: JSON
  }
  type AuthPayload {
    token: String
    user: User
  }
  input UserCreateInput {
    email: String!
    name: String
    password: String!
    password_confirmation: String!
  }

  input UserUniqueInput {
    email: String
    id: Int
  }

  scalar DateTime
`

