import userQueries from './query/userQueries'
import userMutation from './mutation/userMutation'

import projectMutation from './mutation/projectMutation'
import projectQueries from './query/projectQueries'
const resolvers =  [userQueries, userMutation, 
                        projectMutation, projectQueries
                    ]

export  { resolvers }