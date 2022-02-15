import userTypeDefs from './userTypeDefs'
import projectTypeDefs from './projectTypeDefs'
import { gql } from 'apollo-server-express'

const baseTypeDefs = gql`
  type Query
`
const typeDefs = [baseTypeDefs, userTypeDefs, projectTypeDefs]

export { typeDefs }