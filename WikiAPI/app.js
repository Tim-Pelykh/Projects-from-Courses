const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/restAPI", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/", (req, res) => {
    res.send("Hello");
});

////////// Targeting all Articles //////////

// Get All Articles

app.get("/articles", (req, res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err) {
            res.send(foundArticles);
        } else {
            console.log(err);
        }
        
    });
});

// Post a New Article "Test via Postman"

app.post("/articles", (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err) => {
        if(!err) {
            res.send("Successfully added new article.");
        } else {
            res.send(err);
        }
    });
});

// Delete All Articles

app.delete("/articles", (req, res) => {
    Article.deleteMany((err) =>{
        if(!err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

////////// Targeting specific Article //////////

// Get a specific Article

app.get("/articles/:articleTitle", (req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if(!err) {
            res.send(foundArticle);
        } else {
            res.send(err);
        }
    });
});

// Put(Entirely replaced) a Specific Article

app.put("/articles/:articleTitle", (req, res) => {
    Article.replaceOne({title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},  
        (err) => {
        if(!err){
            res.send("Successfully updated article.");
        } else {
            res.send(err);
        }
    });
});

// Patch a Specifid Article

app.patch("/articles/:articleTitle", (req, res) => {
    Article.updateOne({title: req.params.articleTitle}, {$set: req.body}, (err) => {
        if(!err) {
            res.send("Successfully updated article.");
        } else {
            res.send(err);
        }
    })
});

// Delete a Specific Article

app.delete("/articles/:articleTitle", (req, res) => {
    Article.deleteOne({title: req.params.articleTitle}, (err) => {
        if(!err) {
            res.send("Article was successfully deleted.");
        } else {
            res.send(err);
        }
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has been started on port 3000");
});