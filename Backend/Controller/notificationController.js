const Notification= require('./../Model/notification')
//const User=require('./../Model/userModel')
exports.createNotification=async(req,res)=>{
   try{
    const {userId,type,message,relatedId,status}=req.body
     const notification=await Notification.create({
        userId,
        type,
        message,
        relatedId,
        status:'unread'
     })
             // Emit notification using Socket.IO
        req.io.emit(`notification_${userId}`, notification);
     res.status(200).json({
        status:'Success',
        data:{notification}

     })
   }catch(err){
    throw new Error(err.message)
   }
}

exports.getUserNotification=async(req,res)=>{
  try{
   const notification = await Notification.find({userId:req.params.id}).sort({createdAt:-1})
     res.status(200).json({
            status:'Success',
            data:{notification}
         })

  }catch(err){
    res.status(400).json({
            status:'fail',
            message:err.message
        })
  }

}

exports.markNotificationAsRead=async(req,res)=>{
    try{
        await Notification.findByIdAndUpdate(req.params.id,{status:'read',isRead:true})
        res.json({
            message:"Notification marked as read."
        })
    }catch(err){
         res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.deleteNotification=async(req,res)=>{
    try{
        await Notification.findByIdAndDelete(req.params.id)
        res.json({
            message:'Notification deleted successfully.'
        })
    } catch(err){
         res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}