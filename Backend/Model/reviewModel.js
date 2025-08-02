const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   bookID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required:true
   },
   ownerID:{
   type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   reviews:{
    type:String,
    required:true
   },
   rating:{
    type:Number
   },
},{timestamps:true})
const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;