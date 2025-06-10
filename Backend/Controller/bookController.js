const Book=require('./../Model/booksModel');
const User=require('./../Model/userModel')
exports.listBooks=async (req,res) => {
    try{
        const user=await User.findById(req.user.id).populate('library')
        if(!user.library){
            return res.status(403).json({
                message:'Register a library before listing books'
            })
        }
         const book=await Book.create({...req.body,ownerId:user._id})
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
exports.getBooksByCategory=async(req,res)=>{
    try{
        const book=await Book.find({category:req.params.category})
        if(!book || book.lenght===0){
           return res.status(404).json({
            status:'fail',
            message:'No book found in this category'
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
exports.getBooksByType=async(req,res)=>{
    try{
        const book=await Book.find({availableFor:req.params.type.toLowerCase()})
        if(!book || book.length===0){
           return res.status(404).json({
            status:'fail',
            message:'Books not found'
           }) 
        }
        res.status(200).json({
            status:'success',
            results: book.length,
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
exports.searchBook=async(req,res)=>{
    try{
         const {title,author}=req.query;
         const filter={};
         if(title){
            filter.title={ $regex: title , $options:'i'}
         }
         if(author){
            filter.author={ $regex: author , $options:'i'}
         }
        const book= await Book.find(filter)
        if(book.length===0){
           return res.status(404).json({
            status:'fail',
            message:'Books not found'
           }) 
        }
        res.status(200).json({
            status:'success',
            results: book.length,
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
exports.getNearByBooks=async(req,res)=>{
    try{
        const {longitude,latitude}=req.query;  
        const users=await User.find({
            location:{
                $near:{
                    $geometry:{type:'Point',coordinates:[longitude,latitude]},
                    $maxDistance:500,
                }
            }
        }).select('_id')
        const book=await Book.find({ownerId: { $in : users.map( u=>u._id )}})
        const allBooks=await Book.find({});
        const nearByBooks=[...book,...allBooks.filter((b=>!book.includes(b)))]
        res.status(200).json({
            status:'success',
            results: nearByBooks.length,
            data:{
                nearByBooks
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
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}