if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



// require('dotenv').config()
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser=require('body-parser');

const indexRouter=require('./routes/index')
const authRouter=require('./routes/authors')


app.set('view engine', 'ejs');// seeting up the middleware for template engine
app.set('views', __dirname + '/views'); // setting up path for views folder
app.set('layout','layouts/layout');// it is for similar code snippets in every file like header and footer
app.use(expressLayouts);// for using express layouts
app.use(express.static('public')); // this folder has all the style sheets and js files
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, ({
    useNewUrlParser:true
}))
const db = mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=> console.log('Connected to database'));

app.use('/', indexRouter);
app.use('/authors',authRouter);

app.listen(process.env.PORT || 5000);
