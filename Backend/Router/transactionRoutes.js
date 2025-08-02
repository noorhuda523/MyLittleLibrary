const express=require('express')
const controller=require('./../Controller/transactionController')
const authController=require('./../Controller/authController')
const router=express.Router();
router.post('/createTransaction',authController.protect,controller.createTransaction);
router.patch('/updateTransactionStatus/:id',authController.protect,controller.updateTransactionStatus);
router.get('/getTrasactionHistory/:id',controller.getTrasactionHistory);
router.patch('/cancelTransaction/:id',authController.protect,controller.cancelTransaction);
router.post('/swapBooks/:id',authController.protect,controller.swapBooks);
module.exports=router;

