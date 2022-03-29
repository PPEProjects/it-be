import { gql } from 'apollo-server'
export default gql`
  type Mutation {
    createProject(data: ProjectInput!): Project!
    updateProject(data: ProjectInput!): Project
    upsertProject(data: ProjectInput!): Project
    deleteProject(id: ID): Boolean
  }

  type Query {
    allProject: [Project]
    myProject(type:String): [Project]
    listJoinProject(id:Int,type:String):[Project]
    listInterestedProject(id:ID, type:String):[Project]
    LikeProject(id:ID,type:String):[Project]
    searchProject(name: String, type: String, status: String,skip:Int,take:Int):[Project]
    detailProject(id: ID): Project
  adminProject(type:String, name: String, arrange:String,status:String):[Project]
  }

  type Project {
    id: ID
    name: String
    user: User
    attachments: JSON
    authorUserId:Int
    category: String
    description: String
    level: String
    privacy: String
    version: String
    budget: JSON
    type: String
    salary: JSON
    status:     String
    memberJoin: JSON
    is_recruit: Boolean
    is_involved: Boolean
    framework:  JSON
    programingLanguage: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    timeToDo: String
    countProject: Int
    arrange: String
    contentStatus: String
    members: [ProjectMembers],  
    projectLikes: [ProjectLikes],
    projectInterested: [ProjectInterested],
    numberLikes: Int
    numberInterested: Int
  }
  
  input ProjectInput {
    id: ID
    name: String
    coAuthorUserIds: JSON
    attachments: JSON
    category: String
    timeToDo: String
    description: String
    level: String
    privacy: String
    version: String
    budget: JSON
    type: String
    salary: JSON
    status:     String
    framework:  JSON
    programingLanguage: JSON
    memberJoin: JSON
    contentStatus: String
    is_recruit: Boolean
    is_involved: Boolean
  }

  scalar JSON
  scalar DateTime
`

