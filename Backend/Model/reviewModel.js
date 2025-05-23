const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },
   bookID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required:true
   },
   ownerID:{
   type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },
   reviews:{
    type:String,
    required:true
   },
   rating:{
    type:Number
   },
   createAt:{
    type:Date
   }
})
const review=mongoose.model('review',reviewSchema);
module.exports=review;