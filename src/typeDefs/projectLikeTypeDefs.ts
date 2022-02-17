import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectLike(data: ProjectLikeInput!): ProjectLike!
    updateProjectLike(data: ProjectLikeInput!): ProjectLike
    deleteProjectLike(id: Int): Boolean
  }


  type Query {
    allProjectLike(id:Int): [ProjectLike!]!
    myProject: [Project!]!
  }

  type ProjectLike {
    id: Int
    projectId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    project: Project
  }
  
  input ProjectLikeInput {
    id: Int
    projectId: Int

  }

  scalar JSON
  scalar DateTime
`

