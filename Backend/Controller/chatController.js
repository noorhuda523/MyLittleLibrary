const Chat = require('./../Model/chatModel')
const User= require('../Model/userModel');
exports.createChat=async(req,res)=>{
    try{
        const {userId}=req.body;

        const currentUserId=req.user._id;
        if(!userId){
           return res.status(404).json({
                message:'UserId required.'
            })
        }
        let chat =await Chat.findOne({
            participants:{$all:[currentUserId,userId]}
        })
        if(!chat)
        chat = await Chat.create({participants:[currentUserId,userId]})
        res.status(201).json({
            status:'success',
            data:{
                chat
            }
        })
    
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.sendMessage=async(req,res)=>{
    try{
        const {chatId,text}=req.body;   // fields problem in the model chatid missing
        const sender= req.user._id;
        const chat = await Chat.findById(chatId)
        if(!chatId||!text){
            return res.status(400).json({
                message:'Chat and text required'
            })
        }
        const newMessage={
            sender,
            text,
            status:'sent',
            chatTime:new Date()
        }
        chat.message.push(newMessage)
        await chat.save();
        req.io.emit(`chat_${chatId}`,{sender,text})
        res.status(201).json({
            status:'success',
            data:{
                newMessage
            }
        })
    
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}

exports.getUserChats=async(req,res)=>{
    try{
    const chats = await Chat.find({participants:req.user._id}).populate('participants','name').sort({updatedAt:-1});
            res.status(200).json({
            status:'success',
            data:{
                chats
            }

        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.getChatMessages=async(req,res)=>{
    try{
        const chat =await Chat.findById(req.params.chatId).populate('participants','name').populate('message.sender','name')
        if(!chat)
            return res.status(404).json({
        message:'Chat not found'
    })
        res.status(200).json({
            status:'success',
            data:{
                messages:chat.message
            }
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.deleteMessage=async(req,res)=>{
    try{
        const {chatId,messageId}=req.body
        const chat=await Chat.findById(chatId)
        if(!chat){
            return res.status(404).json({
                message:'Chat not found'
            })
        }
        chat.message = chat.message.filter(msg=>msg._id.toString()!==messageId)
        await chat.save();
        req.io.emit(`message_deleted_${chatId}`,{messageId});
        res.status(200).json({
            status:'success',
            message:'Message deleted'
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}

exports.deleteChat=async(req,res)=>{
    try{
        const {chatId}=req.body
        const chat=await Chat.findByIdAndDelete(chatId)
        res.status(200).json({
            status:'success',
            message:'Chat deleted successfully'
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}





