const uCont=require('./../Controller/userController')
const auCont=require('./../Controller/authController')
const express=require('express')
const Uroute=express.Router()

Uroute.patch('/updateUser',auCont.protect,uCont.upadateUser)
Uroute.get('/getUser',uCont.getUser)
Uroute.get('/getAllUser',auCont.protect,auCont.restrictTo('admin'),uCont.getAllUsers)
Uroute.delete('/deleteUser',auCont.protect,auCont.restrictTo('admin'),uCont.deleteUser)
module.exports=Uroute