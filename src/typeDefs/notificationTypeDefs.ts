import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    createNotification(data: NotificationInput): Notification
    updateNotification(data: NotificationInput): Notification
    deleteNotification(id: ID): Boolean
  }

  type Query {  
    allNotification: [Notification]
    detailNotification(projectId:ID): Notification
    notificationByType(type:[String]): [Notification]
  }

  type Notification {
    id:             ID      
    userId:        ID     
    userReceiveId: ID     
    type:         String
    message:      String
    typeId:       Int
    content:       JSON
    isRead:       Boolean   
    createdAt:     DateTime  
    updatedAt:     DateTime  
    deleted:       DateTime
  }
  
  input NotificationInput {
    id:            ID      
    userId:        ID     
    userReceiveId: ID     
    type:          String
    typeId:       Int
    content:       JSON
    isRead:        Boolean  
  }

  scalar JSON
  scalar DateTime
`

