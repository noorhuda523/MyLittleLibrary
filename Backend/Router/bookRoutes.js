const express=require('express');
const router=express.Router();
const controller=require('./../Controller/bookController')
router.post('/listBooks',controller.listBooks);
router.get('/getNearByBooks',controller.getNearByBooks);
router.patch('/updateBook/:id',controller.updateBook);
router.delete('/deleteBook/:id',controller.deleteBook);
router.get('/getBooksByType/:type',controller.getBooksByType);
router.get('/searchBook',controller.searchBook);
router.get('/getBooksByCategory/:category',controller.getBooksByCategory);
module.exports=router;





