const uCont=require('./../Controller/userController')
const auCont=require('./../Controller/authController')
const express=require('express')
const Uroute=express.Router()

Uroute.patch('/updateUser',auCont.protect,uCont.upadateUser)
Uroute.get('/getUser',uCont.getUser)
Uroute.get('/getAllUser',auCont.protect,uCont.getAllUsers)
Uroute.delete('/deleteUser',auCont.protect,uCont.deleteUser)
module.exports=Uroute