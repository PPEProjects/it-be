import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload!
    signupLocalUser(data: UserCreateInput!): AuthPayload!
  }

  type Query {
    allUsers: [User!]!
    searchUsers(name:String,roles:JSON,page:String,limit:String):[User]
    signIn(email: String!, password: String!): AuthPayload!
    me: User!
    detailUser(id: ID): User 
  }
  
  type User {
    email: String!
    id: ID!
    name: String
    roles: JSON
    first_name: String
    phone_number: String
    username: String
    role_label: String  
    is_flag: Boolean
    quotes: String  
    avatar_attachment_id: JSON
    background_attachment_id: JSON
    selfProject:[Project]
    joinProject: [ProjectMembers]
    projectMembers: [ProjectMembers]
    userFeedback:   [UserFeedback]
    avgUserFeedback: String
    userAdvance:    UserAdvance
    numberSelfProject:    Int
    numberJoinedProject:  Int
    avatar_attachment:     JSON
    background_attachment: JSON
    address:               String
    country:               String
    gender:                String
    date_of_birth:         String
   
    allPosition: String
    createdAt: DateTime
    updatedAt: DateTime
    
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
  input UserUpdateInput {
    id: ID
    first_name: String
    name: String
    phone_number: String
    avatar_attachment:     JSON
    background_attachment: JSON
    address:               String
    country:               String
    gender:                String
    date_of_birth:         String
  }
  input UserUniqueInput {
    email: String
    id: ID
  }

  scalar DateTime
`

