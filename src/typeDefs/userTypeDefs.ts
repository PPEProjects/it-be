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

