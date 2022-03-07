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
    detailMemberByIdProject(projectId: ID): [ProjectMembers]
  }

  type ProjectMembers {
    id:         ID
    pmUserId:    ID   
    projectId:  ID   
    roles:      JSON
    project:    Project
    memberUserId:   ID 
    position:        String
    linkTest:      String    
    salary:        JSON
    fee:           JSON
    status:        String
    memberUser: User
    createdAt:  DateTime!
    updatedAt:  DateTime!
    deleted:    DateTime
  }
  
  input ProjectMembersInput {
    id:    ID 
    pmUserId:  ID      
    projectId: ID     
    roles:    JSON 
    memberUserId:   ID
    position:        String
    linkTest:      String    
    salary:        JSON
    fee:           JSON
    status:        String
  }

  scalar JSON
  scalar DateTime
`

