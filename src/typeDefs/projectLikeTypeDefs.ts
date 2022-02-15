import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectLike(data: ProjectLikeInput!): ProjectLike!
    updateProjectLike(data: ProjectLikeInput!): ProjectLike
  }

  type Query {
    allProject: [Project!]!
    myProject: [Project!]!
  }

  type ProjectLike {
    id: Int
    projectId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
  }
  
  input ProjectLikeInput {
    id: Int
    projectId: Int

  }

  scalar JSON
  scalar DateTime
`

