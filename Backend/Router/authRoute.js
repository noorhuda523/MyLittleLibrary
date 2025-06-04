const authCont=require('./../Controller/authController')
const express= require('express')
const auRoute=express.Router()

auRoute.post('/signup',authCont.signUp)
auRoute.post('/signup/verify',authCont.signUpUser)
auRoute.post('/login',authCont.Login)
auRoute.post('/forgotPassword',authCont.forgotPassword)

module.exports=auRoute