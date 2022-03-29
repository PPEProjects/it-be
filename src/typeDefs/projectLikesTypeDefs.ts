import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectLikes(data: ProjectLikesInput!): ProjectLikes
    upsertProjectLikes(data: ProjectLikesInput!): ProjectLikes
   
    deleteProjectLikes(id: ID): Boolean
  }

  type Query {  
    allProjectLikes: [ProjectLikes]
    detailProjectLikes(projectId:ID): ProjectLikes
  }

  type ProjectLikes {
    id:ID
    userId:ID
    projectId: ID
    
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
    memberUser: [User]
    project: [Project]
    numberLikes: Int
  }
  
  input ProjectLikesInput {
   id: ID
   userId:ID
   projectId:ID

  }

  scalar JSON
  scalar DateTime
`
