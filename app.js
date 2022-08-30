//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");
main().catch(err=>console.log(err));
async function main(){

mongoose.connect('mongodb+srv://...........');//mongo atlas url
const postSchema= new mongoose.Schema({
  title:String,
  content:String
});
const Post=new mongoose.model("Post",postSchema);

const homeStartingContent = "There’s a point – 7000 RPM – where everything fades. When your seeing becomes weightless, just disappears. And all that’s left is a body moving through space and time. 7000 RPM that’s where you meet it. Can I ask you a question? The only question that matters. Who are you? (Compose your thoughts here: https://intense-earth-97990.herokuapp.com/compose )";
const aboutContent = "The purpose of this blog is not to “teach” anyone, but if you take something away from it then that is fantastic. The blog is simply as a reference for what I am doing, kind of like an online set of notes.";
const contactContent = "My name is Rishabh Shukla. I am a senior at BNMIT Bangalore pursuing B.E. in CSE. I love to code, read, travel and try something new and innovative.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  Post.find({},function(err,posts){
    if(!err){
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    }
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });


});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id:requestedPostId},function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  });



app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
}//mongo
