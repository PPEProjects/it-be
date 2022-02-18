import userQueries from './query/userQueries'
import userMutation from './mutation/userMutation'

import projectMutation from './mutation/projectMutation'
import projectQueries from './query/projectQueries'

import projectLikeMutation from './mutation/projectLikeMutation'
import projectLikeQueries from './query/projectLikeQueries'

import projectCommentMutation from './mutation/projectCommentMutation'

const resolvers =  [userQueries, userMutation, 
                        projectMutation, projectQueries,projectLikeQueries,
                        projectLikeMutation,
                        projectCommentMutation
import projectCommentMutation from './mutation/projectCommentMutation'
import projectCommentQueries from './query/projectCommentQueries'
import projectInterestedMutation from './mutation/projectInterestedMutation'
import projectInterestedQueries from './query/projectInterestedQueries'
import projectMembersMutation from './mutation/projectMembersMutation'
import projectMembersQueries from './query/projectMembersQueries'
import userAdvanceMutation from './mutation/userAdvanceMutation'
import userAdvanceQueries from './query/userAdvanceQueries'
import userFeedbackMutation from './mutation/userFeedbackMutation'
import userFeedbackQueries from './query/userFeedbackQueries'
const resolvers =  [userQueries, userMutation, 
                        projectMutation, projectQueries,projectLikeQueries,
                        projectLikeMutation,projectInterestedMutation,projectInterestedQueries,projectCommentMutation,projectCommentQueries,projectMembersMutation,
                        projectMembersQueries,userAdvanceMutation,userAdvanceQueries,userFeedbackMutation,userFeedbackQueries,
                    ]

export  { resolvers }