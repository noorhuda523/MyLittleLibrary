const express=require('express')
const controller=require('./../Controller/reviewController')
const authController=require('./../Controller/authController')
const router=express.Router();
router.post('/postReview',authController.protect,authController.restrictTo('buyer'),controller.postReview);
router.get('/getUserReviews/:id',controller.getUserReviews);
router.patch('/updateReview/:id',authController.protect,controller.updateReviews);
router.delete('/deleteReview/:id',authController.protect,controller.deleteReview);
module.exports=router;

