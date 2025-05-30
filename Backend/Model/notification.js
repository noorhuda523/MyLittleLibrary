const mongoose= require('mongoose')

const notificationSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        require:true
    },
    type:{
        type:String,
        enum:['transaction','swap','delivery','chat','system'],
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    relatedId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'type'  
      },
      status:{
        type:String,
        enum:['unread','read'],
        default:'unread'
      },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const Notification=mongoose.model('Notification',notificationSchema)
module.exports=Notification