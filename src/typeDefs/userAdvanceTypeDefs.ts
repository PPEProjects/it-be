import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createUserAdvance(data: UserAdvanceInput!): UserAdvance!
    updateUserAdvance(data: UserAdvanceInput!): UserAdvance
    deleteUserAdvance(id: Int): Boolean
  }

  type Query {
    allUserAdvance(id:Int): [UserAdvance!]!
    myProject: [Project!]!
  }

  type UserAdvance{
    
    id:       Int       
  userId:   Int    
  roles:    JSON
  language:  String
  skill:     String
  info:      String
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    user: User
  project:[Project]
projectMembers: [ProjectMembers]
    
  }
  
  input UserAdvanceInput {
    id:       Int       
  userId:   Int    
  roles:    JSON
  language:  String
  skill:     String
  info:      String

  }

  scalar JSON
  scalar DateTimea
`

