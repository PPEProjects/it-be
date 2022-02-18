import userTypeDefs from './userTypeDefs'
import projectTypeDefs from './projectTypeDefs'
import projectInterestedTypeDefs from './projectInterestedTypeDefs'
import projectMembersTypeDefs from './projectMembersTypeDefs'
import userAdvanceTypeDefs from './userAdvanceTypeDefs'
import userFeedbackTypeDefs from './userFeedbackTypeDefs'
import exampleTypeDefs from './exampleTypeDefs'
import { gql } from 'apollo-server-express'

const baseTypeDefs = gql`
  type Query
`
const typeDefs = [baseTypeDefs, 
  userTypeDefs, projectTypeDefs, 
  ,projectInterestedTypeDefs,projectMembersTypeDefs,
  userAdvanceTypeDefs,userFeedbackTypeDefs,
  exampleTypeDefs
]
export { typeDefs }