import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectMembers(data: ProjectMembersInput!): ProjectMembers !
    updateProjectMembers(data: ProjectMembersInput!): ProjectMembers 
    deleteProjectMembers(id: Int): Boolean
  }

  type Query {
    allProjectMembers(id:Int): [ProjectMembers!]!
    myProject: [Project!]!
  }

  type ProjectMembers {
    id:    Int     
  userId:  Int      
  projectId: Int       
  roles:    JSON
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    project: [Project]
  }
  
  input ProjectMembersInput {
    id:    Int     
  userId:  Int      
  projectId: Int       
  roles:    JSON 

  }

  scalar JSON
  scalar DateTime
`

