const Stripe=require('stripe');
const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
const Book=require('./../Model/booksModel');
exports.createCheckoutSession=async(req,res)=>{
  try{
    const {bookID}=req.body;
    const book=await Book.findById(bookID);
    if(!book){
      return res.status(404).json({
        message:'Book not found'
      })
    }
    const stripeBook=await stripe.products.create({
    name:book.name,
    description:book.description,
    })
    const stripePrice=await stripe.prices.create({
      book:stripeBook.id,
      unit_amount: book.price*100,
      currency:'usd'
    })
    const session=await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items:[{
        price:stripePrice.id,
        quantity:1
      }],
      mode:'payment',
      success_url:'https://yourwebsite.com/success',
      cancel_url:'https://yourwebsite.com/cancel',
    });
    res.status(200).json({data:{session}})
  }catch(error){
    res.status(500).json({
      status:'failed',
      message:error.message
    })
  }
}

