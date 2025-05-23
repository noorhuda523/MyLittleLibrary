const express=require('express')
const controller=require('./../Controller/reviewController')
const authController=require('./../controller/authController')
const router=express.Router();
router.post('/leftReview',authController.protect,authController.restrictTo('buyer'),controller.leftReview);
router.get('/getDoctorReviews/:id',controller.getDoctorReviews);
router.get('/getAllReviews',authController.protect,controller.getAllReviews);
router.patch('/updateReview/:id',authController.protect,authController.restrictTo('buyer'),controller.updateReviews);
router.delete('/deleteReview/:id',authController.protect,authController.restrictTo('buyer'),controller.deleteReview);
module.exports=router;

