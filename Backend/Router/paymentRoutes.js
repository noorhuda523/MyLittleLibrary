const express = require('express');
const controller = require('../Controller/paymentController');
const auth = require('../Controller/authController');
const router = express.Router();
router.post('/createPayment', auth.protect, controller.createPayment);
router.post('/cancelPayment/:paymentId', auth.protect, controller.cancelPayment);
router.get('/checkPaymentStatus/:paymentId', auth.protect, controller.checkPaymentStatus);
router.get('/getPaymentDetails/:paymentId', auth.protect, controller.getPaymentDetails);
module.exports = router;


