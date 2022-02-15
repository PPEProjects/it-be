import userTypeDefs from './userTypeDefs'
import projectTypeDefs from './projectTypeDefs'
import projectLikeTypeDefs from './projectLikeTypeDefs'
import { gql } from 'apollo-server-express'

const baseTypeDefs = gql`
  type Query
`
const typeDefs = [baseTypeDefs, userTypeDefs, projectTypeDefs, projectLikeTypeDefs]

export { typeDefs }