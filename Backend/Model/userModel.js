const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const crypto = require('crypto')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:['user','admin']
    },
    profilPicture:{
        type:String
    },
    library:{
        type:mongoose.Schema.ObjectId,
        ref:'Library'
    },
    bookOwed:[{
        type:mongoose.Schema.ObjectId,
        ref:'Book'
    }],
    transactionHistroy:[{
        type:mongoose.Schema.ObjectId,
        ref:'Transaction'
    }],
    notifications:[{
      type:mongoose.Schema.ObjectId,
      ref:'Notification'
    }],
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point'
        },
       coordinates:{ 
        type:[Number],
        required:true
       }
    },
    createdAt:{
        type:Date,
        default:Date.now
       },
       passwordResetToken:{
       type:String
       },
       TokenExprieIn:{
        type:String
       } 
    
})

userSchema.index({location:'2dsphere'});

userSchema.pre('save',async function(next) {
  if(!this.isModified('password')) return next()
    this.password= await bcrypt.hash(this.password,12)    
})

userSchema.method.passwordReset= function(){
   const resetToken=crypto.randomBytes(32).toString('hex')
   this.passwordResetToken=crypto.createHash('sh256').update(resetToken).digest('hex')
   this.TokenExprieIn=Date.now()+10 * 60 * 1000;
   return resetToken
}
const User=mongoose.model('User',userSchema)
module.exports=User