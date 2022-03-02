import userQueries from './query/userQueries'
import userMutation from './mutation/userMutation'

import projectMutation from './mutation/projectMutation'
import projectQueries from './query/projectQueries'

import projectInterestedMutation from './mutation/projectInterestedMutation'
import projectInterestedQueries from './query/projectInterestedQueries'

import projectMembersMutation from './mutation/projectMembersMutation'
import projectMembersQueries from './query/projectMembersQueries'

import userAdvanceMutation from './mutation/userAdvanceMutation'
import userAdvanceQueries from './query/userAdvanceQueries'

import userFeedbackMutation from './mutation/userFeedbackMutation'
import userFeedbackQueries from './query/userFeedbackQueries'

import exampleQueries from './query/exampleQueries'
import { models } from '../model'
import _ = require('lodash')

const resolvers =  _.merge([
                        userQueries, userMutation, 
                        projectMutation, projectQueries,
                        projectInterestedMutation,projectInterestedQueries,
                        projectMembersMutation, projectMembersQueries,
                        userAdvanceMutation,userAdvanceQueries,
                        userFeedbackMutation,userFeedbackQueries,
                        exampleQueries
                    ],
                    models
                    )

export  { resolvers }