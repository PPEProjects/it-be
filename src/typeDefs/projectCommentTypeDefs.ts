import { gql } from 'apollo-server'

export default gql`

  type Mutation {
    createProjectComment(data: ProjectCommentInput!): ProjectComment!
    updateProjectComment(data: ProjectCommentInput!): ProjectComment
    deleteProjectComment(id: Int): Boolean
  }

  type Query {
    allProjectComment(projectId:Int): [ProjectComment!]!
    detailProjectComment(userId: Int): ProjectComment
    allProjectComment(id: Int): [ProjectComment!]!
    myProject: [Project!]!
  }

  type ProjectComment{
    id: Int
    userId:Int
    projectId: Int
    parentId:Int  
    user: User
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime!
    project:[Project]
  }
  
  input ProjectCommentInput {
    id: Int
    projectId: Int
    parentId:Int
  }

  scalar JSON
  scalar DateTime
`


