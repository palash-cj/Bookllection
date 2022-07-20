const express = require('express');
const router = express.Router();
const Author =require('../models/author')


// All authors route
router.get('/',async(req,res)=>{
    try {
        let searchOptions={}
        if(req.query.name != null && req.query.name !== ''){
            searchOptions.name = new RegExp(req.query.name, 'i')
        }
        const authors = await Author.find(searchOptions)
        res.render("authors/index", {
            authors:authors,
            searchOptions:req.query
        });
    } catch (error) {
        res.redirect('/')
    }
});


// New authors route
router.get('/new',(req,res)=>{
    res.render('authors/new', {author: new Author()})
})

// Create author route
router.post('/',async(req,res)=>{
    const author =new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`);
        res.redirect('authors');
        
    } catch (error) {
        res.render("/authors/new",{
            author:author,
            errorMessage:'Error in creating Author'
        })
    }
    // author.save((err, newAuthor)=>{
    //     if(err){
    //         res.render('/authors/new',{
    //             auhtor:author,
    //             errorMessage:'Error in creating Auhtor'
    //         })
    //     }else{
    //         // res.redirect(`authors/${newAuthor.id}`);
    //         res.redirect('authors');
    //     }
    // })
    
})

module.exports=router;