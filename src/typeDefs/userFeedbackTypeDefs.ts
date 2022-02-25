import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createUserFeedback(data: UserFeedbackInput!): UserFeedback!
    updateUserFeedback(data: UserFeedbackInput!): UserFeedback 
    deleteUserFeedback(id: Int): Boolean
  }

  type Query {
    allUserFeedback: [UserFeedback!]!
    myProject: [Project!]!
  }

  type UserFeedback{
    
    id:       Int      
    userId:   Int       
    projectId: Int       
    grate:     String
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    project: Project
    
  }
  
  input UserFeedbackInput {
    id:       Int      
  userId:   Int       
  projectId: Int       
  grate:     String
  }

  scalar JSON
  scalar DateTime
`

