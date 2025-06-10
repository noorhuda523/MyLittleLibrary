const express=require('express')
const controller=require('./../Controller/paymentContrller')
const Router=express.Router()
Router.post('/createCheckoutSession',controller.createCheckoutSession)
module.exports=Router
