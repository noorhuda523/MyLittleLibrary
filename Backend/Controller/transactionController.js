const Transaction=require('./../Model/transactionModel')
const Book=require('./../Model/booksModel')
const User=require('./../Model/userModel')
exports.createTransaction=async(req,res)=>{
try{
    const{bookID,buyerId,sellerID,transactionType,price,rentDuration}=req.body
    const book= await Book.findById(bookID)
    if(!book){
        return res.status(404).json({
            message:'Book not found'
        })
    }
    const transactionData={
        bookID,
        sellerID,
        price,
        rentDuration,
        transactionType,
        status:'confirmed'
    }
    if(transactionType==='sale'){
        transactionData.buyerID=buyerId;
        book.status='sold'
    }
    else if(transactionType==='rent'){
        transactionData.renterID=buyerId;
        book.status='rented';
    }
        const transaction=await Transaction.create(transactionData)
        await book.save();
        res.status(201).json({
            status:'success',
            data:{
                transaction
            }
        })
}catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
}
exports.updateTransactionStatus=async(req,res)=>{
try{
    const {transactionId,status}=req.body
     const tran= await Transaction.findById(transactionId);
        if (!tran) {
          return res.status(404).json({
            status: 'fail',
            message: 'Transaction not found'
          });
        }
    const transaction=await Transaction.findByIdAndUpdate(transactionId,{status})
    res.status(200).json({
        status:'success',
        message:'Transaction status updated'

        })
}catch(err){
    res.status(400).json({
        status:'fail',
        message:err.message
        
    })
}
}
exports.getTrasactionHistory=async(req,res)=>{
    try{
        const userID=req.params.id
        const transaction=await Transaction.find({
            $or:[
                {buyerID:userID},
                {renterID:userID},
                {swapperA:userID},
                {swapperB:userID},
                {sellerID:userID}
            ]
        })
        .populate('bookID','name')
        .populate('buyerID renterID sellerID swapperA swapperB','name')
        res.status(200).json({
            status:'success',
            results:transaction.length,
            data:{
                transaction
            }
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}
exports.cancelTransaction=async(req,res)=>{
    try{
        const {transactionId}=req.body
        const transaction=await Transaction.findById(transactionId)
        if (!transaction) {
          return res.status(404).json({
            status: 'fail',
            message: 'Transaction not found'
          });
        }
        transaction.status='cancelled';
        await transaction.save();
        const book=await Book.findById(transaction.bookID)
        if(book){
         book.status='available'
         await book.save()
        }
        res.status(200).json({
            status:'success',
            message:'Transaction cancelled successfully.'
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
    }
}}
exports.swapBooks=async(req,res)=>{
try{
    const{bookID,swapperA,swapperB}=req.body
    const book= await Book.findById(bookID)
    if(!book){
        return res.status(404).json({
            message:'Book not found'
        })
    }
    const transaction=await Transaction.create({
        bookID,
        swapperA,
        swapperB,
        transactionType:'swap',
        status:'confirmed',
        transactionDate:Date.now()
    })
        book.previousOwnerId.push(book.ownerId);
        book.ownerId=swapperB;
        book.status='swapped';
        await book.save();
        res.status(201).json({
            status:'success',
            data:{
                transaction
            }
        })
}catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        })
}
}









