const express=require('express')
const controller=require('./../Controller/chatController')
const authController=require('./../Controller/authController')
const router=express.Router();
router.post('/createChat',authController.protect,controller.createChat);
router.post('/sendMessage',authController.protect,controller.sendMessage);
router.get('/getUserChats',authController.protect,controller.getUserChats);
router.get('/getChatMessages/:chatId',authController.protect,controller.getChatMessages);
router.delete('/deleteMessage',authController.protect,controller.deleteMessage);
router.delete('/deleteChat',authController.protect,controller.deleteChat);
module.exports=router;

