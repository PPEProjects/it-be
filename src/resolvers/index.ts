import userQueries from './query/userQueries'
import userMutation from './mutation/userMutation'

import projectMutation from './mutation/projectMutation'
import projectQueries from './query/projectQueries'

import projectLikeMutation from './mutation/projectLikeMutation'
const resolvers =  [userQueries, userMutation, 
                        projectMutation, projectQueries,
                        projectLikeMutation
                    ]

export  { resolvers }