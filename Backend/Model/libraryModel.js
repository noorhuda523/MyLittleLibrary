const mongoose=require('mongoose')

const librarySchema= new mongoose.Schema({
   owner:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
   },
   libraryname:{
    type:String,
    required:true
   },
   location:{
    type:String,
    required:true
   },
   registeredBooks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book'
   }],
   createdAt:{
    type:Date,
    default: Date.now
   }  

})

const Library=mongoose.model('Library',librarySchema)
module.exports=Library