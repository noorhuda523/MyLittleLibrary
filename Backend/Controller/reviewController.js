const Review = require('./../Model/reviewModel')
exports.leftReview=async(req,res)=>{
    try{
        const {buyerID}=req.body
        const transaction=await transaction.findOne({buyerID,userID:req.user._id,status:'Confirmed'})
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
exports.getAllReviews=async(req,res)=>{
    try{
        const review=await Review.find().populate('userID','name').populate('bookID','name')
        res.status(200).json({
            status:'success',
            results:review.length,
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
        const UserID=req.params._id
        const review=await Review.find({UserID}).populate('userID','name').populate('bookID','name')
        res.status(200).json({
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
exports.deleteReview=async(req,res)=>{
    try{
        const review=await Review.findByIdAndDelete(req.params.id)
        res.status(204).json({
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