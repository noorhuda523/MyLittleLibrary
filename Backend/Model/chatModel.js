const mongoose=require('mongoose');
const chatSchema=new mongoose.Schema({
    participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   }],
   message:[{
    sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
    },
    text:{
     type:String,
     required:true
    },
    status:{
    type:String,
    enum:['sent','delivered','read'],
    default:'sent'
    },
    chatTime:{
        type:Date,
        default:Date.now
    }
   }],
},{timestamps:true})
const Chat=mongoose.model('Chat',chatSchema);
module.exports=Chat;
