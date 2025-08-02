const Cart=require('../Model/cartModel')
exports.addToCart=async(req,res)=>{
    try{
        const {userId,bookId,quantity}=req.body;
        let cart=await Cart.findOne({userId});
        if(cart){
            const itemIndex=cart.items.findIndex(item=>item.bookId.toString()===bookId);
        if(itemIndex>-1){
            cart.items[itemIndex].quantity += quantity;
        }else{
        cart.items.push({bookId,quantity})
        }
        cart=await cart.save();
        res.status(200).json(cart);
    } else{
        const newCart=await Cart.create({
            userId,
            items:[{bookId,quantity}]
        });
        res.status(201).json(newCart)
    }
    } catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

exports.getCart=async(req,res)=>{
    try{
        const {userId}= req.params;
        const cart=await Cart.findOne({userId}).populate('items.bookId')
        if(cart){
        res.status(200).json(cart)
        }else{
            res.status(404).json({
                message:'Cart not found'
            })
        }
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

exports.removeFromCart=async(req,res)=>{
    try{
        const {userId,bookId}= req.params;
        const cart=await Cart.findOne({userId})
        if(cart){
            cart.items=cart.items.filter(item=>item.bookId!==bookId)
            cart = await cart.save()
        res.status(200).json(cart)
        }else{
            res.status(404).json({
                message:'Cart not found'
            })
        }
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

exports.deleteCart=async(req,res)=>{
    try{
        const {userId}= req.params;
        const cart=await Cart.findOneAndDelete({userId})
        if(!cart){
            res.status(404).json({
            message:'Cart not found'
            })
        }
           res.status(200).json({
            status:'success',
            message:'Cart deleted successfully'
           })
        
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}