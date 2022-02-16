import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectComment(data: ProjectCommentInput!): JSON
    updateProjectComment(data: ProjectCommentInput!): ProjectComment
  }

  type Query {
    allProjectComment(projectId:Int): [ProjectComment!]!
    myProject: [Project!]!
  }

  type ProjectComment{
    id: Int
    userId:Int
    projectId: Int
    parentId:Int  
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
  }
  
  input ProjectCommentInput {
    id: Int
    projectId: Int
    parentId:Int
  }

  scalar JSON
  scalar DateTime
`

