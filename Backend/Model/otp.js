const mongoose=require('mongoose')

const otpSchema= new mongoose.Schema({
    email:{
       type:String,
        required:true,
        unique:true
     },
   
    code:{
        type:Number ,
        required:true
    },
    expireAt:{
        type:Number,
        required:true
    }

},{timestamps:true})
otpSchema.pre('save',async function(next) {
    this.code= await bcrypt.hash(this.code,12)
    next()
})
const OTP=mongoose.model('OTP',otpSchema)
module.exports=OTP