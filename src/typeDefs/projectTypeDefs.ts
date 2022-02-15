import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProject(data: ProjectInput!): Project!
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
    category: String
    description: String
    level: String
    privacy: String
    version: String
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

  }

  scalar JSON
  scalar DateTime
`

