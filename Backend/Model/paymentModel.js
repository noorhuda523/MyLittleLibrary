const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'cash_on_delivery'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'expired'],
        default: 'pending'
    },
    paymentDeadline: {
        type: Date,
        required: true
    },
    cancelledAt: {
        type: Date
    },
    cancellationReason: {
        type: String
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
