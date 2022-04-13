import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectMembers(data: ProjectMembersInput!): ProjectMembers !
    upsertProjectMembersUserIds(data: ProjectMembersInputId!): [ProjectMembers]
    updateProjectMembers(data: ProjectMembersInput!): ProjectMembers 
    upsertProjectMembers(data: ProjectMembersInput!):ProjectMembers
    deleteProjectMembers(id: ID): Boolean
  }

  type Query {
    allProjectMembers: [ProjectMembers]
    detailMemberByIdProject(projectId: ID): [ProjectMembers]
    detailProjectMemberByIdPm(pmUserId:ID): [ProjectMembers]
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
    userFeedback: UserFeedback
    jobDescription: String
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
    jobDescription: String
  }
  input ProjectMembersInputId{
    id:    ID 
    pmUserId:  ID      
    projectId: ID     
    roles:    JSON 
    memberUserId:   [ID]
    position:        String
    linkTest:      String    
    salary:        JSON
    fee:           JSON
    status:        String
    jobDescription: String
  }

  scalar JSON
  scalar DateTime
`

