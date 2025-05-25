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
    Textype:{
        type:String,
        enum:['transaction','delivery','chat','system'],
        require:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const Notification=mongoose.model('Notification',notificationSchema)
module.exports=Notification