import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createProjectInterested(data: ProjectInterestedInput!): ProjectInterested!
    updateProjectInterested(data: ProjectInterestedInput!): ProjectInterested
    deleteProjectInterested(id: Int): Boolean
  }

  type Query {
    allProjectInterested(id:Int): [ProjectInterested!]
    myProject: [Project!]!
  }

  type ProjectInterested {
    id:Int
    projectId: Int 
    userId:Int
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: DateTime
project: Project
  }
  
  input ProjectInterestedInput {
   id:Int 
   projectId: Int
   userId:Int

  }

  scalar JSON
  scalar DateTimea
`

