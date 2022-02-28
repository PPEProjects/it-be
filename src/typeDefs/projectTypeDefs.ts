import { gql } from 'apollo-server'
export default gql`
  type Mutation {
    createProject(data: ProjectInput!): Project!
    updateProject(data: ProjectInput!): Project
    upsertProject(data: ProjectInput!): Project
    deleteProject(id: Int): Boolean
  }

  type Query {
    allProject: [Project]
    myProject(type:String): [Project]
    listJoinProject(id:Int,type:String):[Project]
    listInterestedProject(id:Int, type:String):[Project]
    searchProject(name: String, type: String, status: String):[Project]
    detailProject(id: Int): Project
  }

  type Project {
    id: Int
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
    framework:  String
    programingLanguage: String
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    timeToDo: String
    countProject: Int
    members: [ProjectMembers]
  }
  
  input ProjectInput {
    id: Int
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
    framework:  String
    programingLanguage: String
    memberJoin: JSON
    is_recruit: Boolean
    is_involved: Boolean
  }

  scalar JSON
  scalar DateTimea
`

