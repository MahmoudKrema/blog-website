const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//express app
const app = express();

//mongodb
const dbURI = "mongodb+srv://MahmoudKrema:myfirstblog@myblog.xeqze.mongodb.net/myblog?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));



// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.urlencoded( {extended: true} ));


// app.get('/add-blog', (req,res) => {
//     //blog instance
//     const blog = new Blog({
//         title: "my second blog",
//         snippet: "this is my blog",
//         body: "loremssdsdfsfsfsfsdfsdfsdfsdfsdf"
//     });
//     //blog instance method "save"
//     blog.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     });

// });

app.get('/', (req,res) => {
   
    res.redirect('/blogs');

});

app.get('/blogs', (req,res) => {

    Blog.find().sort( {createdAt: -1 } )
    .then((result => {
        res.render('index', {title: "Blogs", blogs:result});
    }))
    .catch((err) => {
        console.log(err);
    })
});

app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);
    /* req.body is: 
    {
        title: "my second blog",
        snippet: "this is my blog",
        body: "loremssdsdfsfsfsfsdfsdfsdfsdfsdf"
    }
    and the keys are tha same as the keys of the schema
    so I can just pu the object (look at the previous code in the same folder (ejs program))
    */

    // Save to the database
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) =>{
        console.log(err);
    });


});

app.get('/about', (req,res) => {

    res.render('about', {title: "About"});

});

app.get('/blogs/create', (req,res) => {


    res.render('create', {title: "New Blog"});

});




app.use( (req,res) => {

    res.status(404).render('404', {title: "error: 404"});

});
