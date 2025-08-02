const Stripe=require('stripe');
const stripe=Stripe(process.env.STRIPE_SECRET_KEY);
const Book=require('./../Model/booksModel');
const Payment = require('../Model/paymentModel');
const Transaction = require('../Model/transactionModel');
const Notification = require('../Model/notification');

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
      products:stripeBook.id,
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
exports.createPayment = async (req, res) => {
    try {
        const { transactionId, amount, paymentMethod } = req.body;
        const paymentDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);  // 24 hour deadline

        const payment = await Payment.create({
            transactionId,
            amount,
            paymentMethod,
            paymentDeadline
        });

        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({
                status: 'fail',
                message: 'Transaction not found'
            });
        }

        await Notification.create({
            userId: transaction.buyerID,
            type: 'transaction',
            title: 'Payment Pending',
            message: `Please complete your payment of ${amount} within 24 hours to confirm your book purchase.`,
            data: { transactionId, paymentId: payment._id }
        });

        res.status(201).json({
            status: 'success',
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.cancelPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { reason } = req.body;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        if (payment.status !== 'pending') {
            return res.status(400).json({
                status: 'fail',
                message: 'Can only cancel pending payments'
            });
        }

        payment.status = 'cancelled';
        payment.cancelledAt = new Date();
        payment.cancellationReason = reason;
        await payment.save();

        const transaction = await Transaction.findById(payment.transactionId);
        if (!transaction) {
            return res.status(404).json({
                status: 'fail',
                message: 'Transaction not found'
            });
        }

        transaction.status = 'cancelled';
        await transaction.save();

        const book = await Book.findById(transaction.bookID);
        book.status = 'available';
        await book.save();

        await Notification.create({
            userId: transaction.buyerID,
            type: 'transaction',
            title: 'Payment Cancelled',
            message: 'Your payment has been cancelled and the transaction is void.',
            data: { transactionId: transaction._id }
        });

        await Notification.create({
            userId: transaction.sellerID,
            type: 'transaction',
            title: 'Transaction Cancelled',
            message: 'The buyer has cancelled the payment. The book is now available again.',
            data: { transactionId: transaction._id }
        });

        res.json({
            status: 'success',
            message: 'Payment cancelled successfully',
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.checkPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        if (payment.status === 'pending' && new Date() > payment.paymentDeadline) {
            payment.status = 'expired';
            await payment.save();

            const transaction = await Transaction.findById(payment.transactionId);
            if (!transaction) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Transaction not found'
                });
            }

            transaction.status = 'cancelled';
            await transaction.save();

            const book = await Book.findById(transaction.bookID);
            book.status = 'available';
            await book.save();

            await Notification.create({
                userId: transaction.buyerID,
                type: 'transaction',
                title: 'Payment Expired',
                message: 'Your payment deadline has expired. The transaction has been cancelled.',
                data: { transactionId: transaction._id }
            });

            await Notification.create({
                userId: transaction.sellerID,
                type: 'transaction',
                title: 'Transaction Cancelled',
                message: 'The payment deadline has expired. The book is now available again.',
                data: { transactionId: transaction._id }
            });
        }

        res.json({
            status: 'success',
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await Payment.findById(paymentId)
            .populate('transactionId');
            
        if (!payment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Payment not found'
            });
        }

        res.json({
            status: 'success',
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};



