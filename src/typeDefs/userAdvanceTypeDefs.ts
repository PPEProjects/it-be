import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createUserAdvance(data: UserAdvanceInput!): UserAdvance!
    updateUserAdvance(data: UserAdvanceInput!): UserAdvance
    upsertUserAdvance(data: UserAdvanceInput!): UserAdvance
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
  plan:         String    
  goal:         String
  address: String
  country: String
  dateOfBirth: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deleted: DateTime
  user: User
  selfProject:[Project]
  joinProject: [ProjectMembers]
  userFeedback: [UserFeedback]
  numberSelfIdeas:  Int
  numberJoinedProject: Int
  numberFramework: Int
    
  }
   
  
  input UserAdvanceInput {
    id:       Int       
    userId:   Int    
    roles:    JSON
    language:  String
    skill:     JSON
    info:      String
    plan:         String    
    goal:         String
    user: UserUpdateInput
  }

  scalar JSON
  scalar DateTimea
`

