const User = require('./../Model/userModel')

exports.upadateUser=async(req, res)=>{
    try{
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('library')
        if(!user){
            res.status(404).json({
            status:'fail',
            message:' UserNotFound'})
        }
         res.status(200).json({
            status:'Success',
            data:{user}
         })

    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }

}

exports.getUser=async(req,res)=>{
    try{
        const user= await User.findById(req.params.id)
         if(!user){
            res.status(404).json({
            status:'fail',
            message:' UserNotFound'})
        }
         res.status(200).json({
            status:'Success',
            data:{user}
         })

    }catch(err){
         res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getAllUsers=async(req,res)=>{
    try{
     const user= await User.find()
     res.status(200).json({
            status:'Success',
            data:{user}
         })

    }catch(err){
       res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}
exports.getNotification=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id).populate('notifications')
          res.status(200).json({
            status:'Success',
            data:user.notifications
         })

    }catch(err){
       res.status(400).json({
            status:'fail',
            message:err.message
        })
    
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:'Success',
            data:null
         })
    }catch(err){
       res.status(400).json({
            status:'fail',
            message:err.message
        })
}}