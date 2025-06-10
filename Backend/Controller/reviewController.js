const Review = require('./../Model/reviewModel')
const Transaction = require('../Model/transactionModel');
exports.postReview=async(req,res)=>{
    try{
        const {ownerID,bookID}=req.body
        const transaction=await Transaction.findOne({
            bookID,
            status:'confirmed',
            $or:[
                {buyerID:req.user._id, sellerID: ownerID},
                {renterID:req.user._id, sellerID: ownerID},
                {swapperA:req.user._id, swapperB: ownerID},
                {swapperB:req.user._id, swapperA: ownerID}
            ]

        })
        if(!transaction){
            return res.status(400).json({
                message:'You cannot left review without transaction'
            })
        }
        const review=await Review.create({...req.body,userID:req.user._id})
        res.status(201).json({
            status:'success',
            data:{
                review
            }
        })
    
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.getUserReviews=async(req,res)=>{
    try{
        const ownerID=req.params.id
        const reviews=await Review.find({ownerID}).populate('userID','name').populate('ownerID','name').populate('bookID','title')
        res.status(200).json({
            status:'success',
             results:reviews.length,
            data:{
                reviews
            }
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.updateReviews=async(req,res)=>{
    try{
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found'
      });
    }
    if (review.userID.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not allowed to update this review.'
      });
    }

        const updateReview= await Review.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({
            status:'success',
            data:{
                updateReview
            }

        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.deleteReview=async(req,res)=>{
    try{
        const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Review not found'
      });
    }
    if (review.userID.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not allowed to delete this review.'
      });
    }
        const deleteReview=await Review.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:'success',
            message:'Review deleted',
            data:null
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}