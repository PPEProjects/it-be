import { gql } from 'apollo-server'

export default gql`
  
  type Query {
    ExampleQuery: example
  }

  type example {
    sayHi: String
  }
  
  input ProjectInterestedInput {
    sayHi: String
  }

  scalar JSON
  scalar DateTime
`

