import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectInterested(data: ProjectInterestedInput!): ProjectInterested
    updateProjectInterested(data: ProjectInterestedInput!): ProjectInterested
    deleteProjectInterested(id: ID): Boolean
  }

  type Query {  
    allProjectInterested: [ProjectInterested]
    detailProjectInterested(projectId:ID): ProjectInterested
  }

  type ProjectInterested {
    id:ID
    projectId: ID
    userId:ID
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    memberUser: [User]
    project: [Project]
    numberInterested: Int
  }
  
  input ProjectInterestedInput {
   id: ID
   projectId:ID
   userId:ID

  }

  scalar JSON
  scalar DateTime
`

