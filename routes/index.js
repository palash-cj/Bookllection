const express = require('express');
const router = express.Router();
const Book = require('../models/book')


// All authors route
router.get('/',async(req,res)=>{
    let Book
    try{
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec()
    }catch{
        books=[]
    }
    res.render("index",{books:books});
});



module.exports=router;