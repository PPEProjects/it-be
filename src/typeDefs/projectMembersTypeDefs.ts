import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectMembers(data: ProjectMembersInput!): ProjectMembers !
    updateProjectMembers(data: ProjectMembersInput!): ProjectMembers 
    upsertProjectMembers(data: ProjectMembersInput!):ProjectMembers
    deleteProjectMembers(id: Int): Boolean
  }

  type Query {
    allProjectMembers: [ProjectMembers]
    detailMemberByIdProject(projectId: Int): [ProjectMembers]
  }

  type ProjectMembers {
    id:         Int     
    pmUserId:     Int      
    projectId:  Int       
    roles:      JSON
    project:    Project
    memberUserId:   Int  
    position:        String
    linkTest:      String    
    salary:        JSON
    fee:           JSON
    status:        String

    memberUser: User
    createdAt:  DateTime!
    updatedAt:  DateTime!
    deleted:    DateTime
    joinedProject: Int
  }
  
  input ProjectMembersInput {
    id:    Int     
    pmUserId:  Int      
    projectId: Int       
    roles:    JSON 
    memberUserId:   Int  
    position:        String
    linkTest:      String    
    salary:        JSON
    fee:           JSON
    status:        String
  }

  scalar JSON
  scalar DateTime
`

