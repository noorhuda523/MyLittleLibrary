const Library=require('./../Model/libraryModel')
const User= require('./../Model/userModel')

exports.registerLibrary=async(req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(user.library){
            return res.status(400).json({
                error:'Library alrready registered'
            })
        }
        const library= await Library.create({owner:user._id,...req.body})
         user.library= library._id
         res.status(200).json({
            status:'Success',
            data:library
         })
      
}catch(err){
    res.status(400).json({
            status:'fail',
            message:err.message
        })
}
}

exports.getLibrary=async(req,res)=>{
    try{
        const library=await Library.findOne({owner:req.params.id}).populate('registeredBooks')
         if(!library){
            return res.status(400).json({
                error:'Library not found.'
            })
         }
       res.status(200).json({
            status:'Success',
            data:{library}
         })

    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.updateLibrary=async(req,res)=>{
    try{
    const library=await Library.findByIdAndUpdate(req.params.id,req.body,{new:true})
   res.status(200).json({
            status:'Success',
            data:library
         })  

}catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.verifyLibraryOwnership=async(req,res,next)=>{
    try{
        const library= await Library.findOne({owner:req.user.id})
        if(!library){
            return res.status(403).json({
                message:'Library not found'
            })
        }
       req.library=Library
       next()

    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}
//transaction me add ho ga

exports.verifyMembership= async(req,res,next)=>{
    try{
        const library= await Library.findOne({owner:req.user.id})
        if(!library){
            return res.status(403).json({
                message:'Register your library.'
            })
        }
        const {bookId}=req.body;
        if(!library.registeredBooks.includes(bookId)){
             return res.status(403).json({
                message:'Only register member can do transaction.'
            })
        }
        next()

    }catch(err){
         res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}