import { gql } from 'apollo-server'

export default gql`
  
  type Query {
    ExampleQuery: example
  }

  type example {
    id:Int
  }
  
  input ProjectInterestedInput {
   id:Int 
   projectId: Int
   userId:Int

  }

  scalar JSON
  scalar DateTime
`

