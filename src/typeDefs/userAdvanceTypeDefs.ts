import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createUserAdvance(data: UserAdvanceInput!): UserAdvance!
    updateUserAdvance(data: UserAdvanceInput!): UserAdvance
    deleteUserAdvance(id: Int): Boolean
  }

  type Query {
    allUserAdvance: [UserAdvance]
     detailUserAdvance(userId: Int): UserAdvance
  }

  type UserAdvance{
    
  id:       Int       
  userId:   Int    
  roles:    JSON
  language:  String
  skill:     JSON
  info:      String
  personalGoal: String
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
    skill:     JSON
    info:      String
    personalGoal: String
  }

  scalar JSON
  scalar DateTimea
`

