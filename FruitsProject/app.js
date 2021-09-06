const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true});

// creating schema with validations
const fruitSchema=new mongoose.Schema({
  name:{
    type: String,
    required: [true,"Please enter the name"]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit=mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
  name:"Peaches",
  rating:4,
  review:"Pretty solid as fruit"
});
fruit.save();



const personSchema=new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
});

const Person=mongoose.model("Person",personSchema);

const person=new Person({
  name:"John",
  age:27
});
person.save();

// inserting many
const kiwi=new Fruit({
  name:"kiwi",
  score:9,
  review:"Nice fruit"
});

const sapota=new Fruit({
  name:"sapota",
  rating:10,
  review:"Wonderful fruit"
});

Fruit.insertMany([kiwi,sapota],function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully inserted fruits into database");
  }
});

// finding items in the collections
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  } else{

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// updating item
Fruit.updateOne({
  _id:"6135b37c223bcec2544fea39"
},
{
  name:"Mango"
},function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully updated");
  }
});

// delete item
Fruit.deleteOne({name:"Mango"},function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully Deleted");
  }
});

// delete many
Fruit.deleteMany({name:"Peaches"},function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully Deleted many");
  }
});

// embedding one document to other
const pineapple =new Fruit({
  name:'Pineapple',
  score:8,
  review:"Average fruit"
});
pineapple.save();

const desu=new Person({
  name:"Desu",
  age:21,
  favouriteFruit:pineapple
});
desu.save();

// embedding and updating
const papaya =new Fruit({
  name:'Papaya',
  score:1,
  review:"Worst fruit"
});
papaya.save();

Person.updateOne({_id:"6135a3d728340d525d2f0123"},{favouriteFruit:papaya},function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Successfully updated");
  }
});
