import { gql } from 'apollo-server'
export default gql`
  type Mutation {
    createProject(data: ProjectInput!): Project!
    updateProject(data: ProjectInput!): Project
    deleteProject(id: Int): Boolean
  }

  type Query {
    allProject: [Project!]!
    myProject: [Project!]!
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
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
   
  }
  
  input ProjectInput {
    id: Int
    name: String
    coAuthorUserIds: JSON
    attachments: JSON
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
  }

  scalar JSON
  scalar DateTimea
`

