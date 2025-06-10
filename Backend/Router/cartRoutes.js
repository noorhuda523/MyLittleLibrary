const express=require('express');
const router=express.Router();
const controller=require('../Controller/cartController')
router.post('/addToCart',controller.addToCart);
router.get('/getCart/:userId',controller.getCart);
router.patch('/removeFromCart/:userId/:bookId',controller.removeFromCart);
router.delete('/deleteCart/:userId',controller.deleteCart);
module.exports=router;
