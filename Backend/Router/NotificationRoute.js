const express=require('express')
const NotiCont=require('./../Controller/notificationController')
const nRoute=express.Router()

nRoute.post('/createNotification',NotiCont.createNotification)
nRoute.get('/getUserNotification/:id',NotiCont.getUserNotification)
nRoute.patch('/mark-read/:id',NotiCont.markNotificationAsRead)
nRoute.delete('/deleteNotification/:id',NotiCont.deleteNotification)
module.export=nRoute