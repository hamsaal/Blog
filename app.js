

// Libraries  required
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const checker = require(__dirname + "/myfunctions.js");
const mongoose = require('mongoose');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
const blogsSchema = new mongoose.Schema({
  originalTitle: String,
  kebabTitle: String,
  post: String
})

const Blog = mongoose.model("Blog",blogsSchema);




app.get("/",function(req,res){
Blog.find({},function(err,docs){
  if (!err){
  res.render("home",{homecontent:homeStartingContent, blogs:docs})};
})
})


app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
})
app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})
app.get("/compose",function(req,res){

  res.render("compose");
})
app.get('/posts/:id', function (req, res){
  const requestedPost = req.params.id;
  Blog.findOne({kebabTitle:requestedPost},function(err,doc){
    if (!err){
      console.log(doc);
      res.render("post",{requestedTitle:doc.originalTitle,requestedPost:doc.post})
    }
  })
})


app.post("/compose",function(req,res){
const original = req.body.title;
const kebab = _.kebabCase(req.body.title);
const post = req.body.post;

const blog = new Blog({
  originalTitle: original,
  kebabTitle: kebab,
  post: post
})
blog.save();
res.redirect("/")
})


app.listen(3000, function() {
  console.log("Server successfully  started on port 3000");
});


// Connecting a data base to our server
async function main() {
  //localhost ain't working because in config it's binding to 127.0.0.1
  const url = "mongodb://127.0.0.1:27017/blogDB ";
  await mongoose.connect(url)

}
