const express=require('express');
const router=express.Router();
const controller=require('./../Controller/bookController')
router.post('/listBooks',controller.listBooks);
router.get('/getAllBooks',controller.getAllBooks);
router.patch('/updateBook/:id',controller.updateBook);
router.delete('/deleteBook/:id',controller.deleteBook);
router.get('/getBook/:id',controller.getBook);
module.exports=router;





