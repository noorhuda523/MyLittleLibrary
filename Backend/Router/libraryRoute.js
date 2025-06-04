const express=require('express')
const libCont=require('./../Controller/libraryController')

const liRoute=express.Router()

liRoute.post('/register',libCont.registerLibrary)
liRoute.patch('/updateLibrary/:id',libCont.updateLibrary)
liRoute.get('/getLibrary/:id',libCont.getLibrary)
module.exports=liRoute
