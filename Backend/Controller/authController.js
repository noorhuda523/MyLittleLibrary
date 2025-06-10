const User = require('../models/userModel')
const Otp=require('../models/otp')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const sendmail=require('../utils/email')


exports.signUp=async(req,res)=>{
   try{const {email}=req.body;
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400).json({
            status:'fail',
            message:'User already Exist'
        })
    } 
     const otpcode = Math.floor(1000 + Math.random() * 9000);
     console.log(otpcode);
     await Otp.create({
        email:email,
        code: otpcode,
      expireAt:new Date(Date.now() + 10 * 60 * 1000)

     })
    
     await sendmail({
        to:email,
        subject:'Email Verification OTP',
        message:`Your OTP code is ${otpcode}`

     })
    res.status(200).json({
      status: "success",
      message: "OTP sent for email verification!"
    });
  }catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
}
exports.signUpUser= async(req,res)=>{
  try{  const {name,email,password,role,otp}=req.body
   
    const OtpEntry= await Otp.findOne({
        email,
        code:otp,
        expireAt:{$gt: new Date()}
    })

     if (!OtpEntry) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or expired OTP."
      });
    }

    const newUser= await User.create({name,email,password,role,emailVerified:true})

    await sendmail({
        to:email,
        subject:'Welcome!',
        message:`${name}! , Welcome to our platform.`
    })
 
    res.status(201).json({
        status:'Success',
        data:newUser
    })
}catch(err){
      res.status(400).json({
        status:'fail',
        message:err.message})
    }
}
      



const userToken=(userid)=>{
    return jwt.sign({id:userid},'my-personal-key-access-083',{expiresIn:'9h'})
}
exports.Login = async(req,res)=>{
    try {
        const {email,password, otp}= req.body
     if (!email || !password ||!otp) {
        res.status(404).json({
          status:'fail',
            message:'Please Provide Email Or Password,OTP'
        })
     }
     const user= await User.findOne({email}).select('+password')
     if(!user){
        res.status(404).json({
            status:'Fail',
            message:'Invalid Email Or Password'
        })
     }    
     const isMatch= await bcrypt.compare(password,user.password)
     if (!isMatch) {
        res.status(404).json({
            status:'Fail',
            message:'Invalid Email Or Password'
        })
     }
   
    
     const token =userToken(user._id)
        res.status(200).json({
            status:'Success',
            data:{user, token }
        })
} catch(err){
    res.status(400).json({
        status:'fail',
        message:err.message
    })
}

}

exports.protect=async(req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token=req.headers.authorization.split(' ')[1]        
    }
    if (!token) {
        return res.status(404).json({
            status:'fail',
            message:'Token not found'
        
        })
    }
    const decode= jwt.verify(token,'my-personal-key-access-083')
    const currentUser= await User.findById(decode.id)
     

    req.user=currentUser;
    console.log(currentUser);
    console.log(decode);
    next();
    
    
}

exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                status:'forbidden',
                message:'You are not allow to access'
            })
        }
        next()
    }
      
}

exports.forgotPassword= async (req,res)=>{
    const {email} =req.body
    if (!email) {
       return res.status(404).json({
            status:'not found',
            message:'Please provide your email'
        })
    }
    const user= await User.findOne({email})
    if (!user) {
        return res.status(404).json({
            status:'fail',
            message:'This email of user does not exist.'
        }) 
    }
    // Generate reset token
    const resetToken=user.passwordReset()
    await user.save({validateBeforeSave:false}) // Save user without validation
     // Create reset URL
    const resetUrl= `${req.protocol}://${req.get('host')}/auth/reset/forgotPassword/${resetToken}`
     console.log(resetUrl);
 try{
   const message=`Forgot your password?Submit your patch to this link ${resetUrl}`
   await  sendmail({
    to:user.email,
    subject:'forgot password email',
    message:message
   })

   res.status(200).json({
    message:'Reset email has send.'
   })
}catch(err){
    user.passwordResetToken=undefined
    user.tokenExpireIn=undefined
    res.status(500).json({
         message:err.message
    })
}    
   
}

