import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createUserFeedback(data: UserFeedbackInput!): UserFeedback!
    updateUserFeedback(data: UserFeedbackInput!): UserFeedback 
    deleteUserFeedback(id: ID): Boolean
  }

  type Query {
    allUserFeedback: [UserFeedback]
  }

  type UserFeedback{
    
    id:       ID      
    userId:   ID     
    projectId: Int    
    content: String   
    grate:     Int
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    project: [Project]
    
  }
  
  input UserFeedbackInput {
    id:       ID  
    userId:   ID   
    projectId: Int  
    content:String     
    grate:     Int
  }

  scalar JSON
  scalar DateTime
`

