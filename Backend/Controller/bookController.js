const Book=require('./../Model/booksModel');
exports.listBooks=async (req,res) => {
    try{
         const book=await Book.create({...req.body,ownerId:req.user._id})
         res.status(201).json({
            status:'success',
            data:{
                book
            }
         })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
exports.getAllBooks=async(req,res)=>{
    try{
        const books=await Book.find()
        res.status(200).json({
            status:'success',
            results:books.length,
            data:{
                books
            }

        })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
       
    }
}
exports.updateBook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        res.status(200).json({
            status:'success',
            data:{
                book
            }
        })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
exports.deleteBook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            message:'Book deleted',
            data:null
        })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}
exports.getBook=async(req,res)=>{
    try{
        const book=await Book.findById(req.params.id)
        if(!book){
           return res.status(404).json({
            status:'fail',
            message:'Book not found'
           }) 
        }
        res.status(200).json({
            status:'success',
            data:{
                book
            }
        })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}







