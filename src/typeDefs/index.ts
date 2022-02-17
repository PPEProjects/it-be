import userTypeDefs from './userTypeDefs'
import projectTypeDefs from './projectTypeDefs'
import projectLikeTypeDefs from './projectLikeTypeDefs'
import projectCommentTypeDefs from './projectCommentTypeDefs'
import projectInterestedTypeDefs from './projectInterestedTypeDefs'
import projectMembersTypeDefs from './projectMembersTypeDefs'
import userAdvanceTypeDefs from './userAdvanceTypeDefs'
import userFeedbackTypeDefs from './userFeedbackTypeDefs'
import { gql } from 'apollo-server-express'

const baseTypeDefs = gql`
  type Query
`
const typeDefs = [baseTypeDefs, userTypeDefs, projectTypeDefs, 
  projectLikeTypeDefs,projectCommentTypeDefs,projectInterestedTypeDefs,projectMembersTypeDefs,userAdvanceTypeDefs,userFeedbackTypeDefs]
export { typeDefs }