const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Book title required ']
    },
    author:{
        type:String,
        required:true
    },
    description:{
      type:String
    },
    previousOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,
    },
     ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
    },
    category:{
    type:String,
    required:true,
    enum:['fiction','Non-fiction','science','biography','history','other']
    },
    status:{
        type:String,
        enum:['available','sold','rented','swapped'],
        default:'available'
        
    },
    availableFor:{
        type:String,
        required:true,
        enum:['sale','rent','swap'],
        default:'sale'
     },
     requestId:{
        type:String,
     },
     price:{
        type: Number,
     },
     rentDuration:{
        type:Number, 
     }
})
const Book=mongoose.model('Book',bookSchema);
module.exports=Book;
