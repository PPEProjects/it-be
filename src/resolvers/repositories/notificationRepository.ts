const {prisma} = require('../../database')

async function sendNotification(userId, userReceiveId, content, type){
    const createNotification = await prisma.notification.create({
        data:{
            userId: +userId,
            userReceiveId: +userReceiveId,
            content: content,
            type: type,
            typeId: content.id
        }
    })
    return createNotification
}


export  {
    sendNotification,
}