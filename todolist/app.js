const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var items=["Buy Food","Cook Food","Eat Food"];

app.set("view engine","ejs");

app.get("/",function(req,res){
  var today=new Date();

  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  var day=today.toLocaleDateString("en-US",options);

  res.render("list",{listTitle:day,newListItems:items});
});

app.post("/",function(req,res){
  var item=req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
