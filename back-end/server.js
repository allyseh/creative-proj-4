const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/giftList', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000000
  }
});

// Create a scheme for people
const personSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number, 
  relation: String,
  likes: String,
});

// Create a model for people
const Person = mongoose.model('Person', personSchema);

// Create a scheme for gifts
const giftSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,   //path to img
});

// Create a model for items in the museum.
const Gift = mongoose.model('Gift', giftSchema);

// Create a scheme for list entries
const entrySchema = new mongoose.Schema({
  receiver: personSchema,
  gifts: [giftSchema],
});

// Create a model for list entries
const Entry = mongoose.model('Entry', entrySchema);

// Create a scheme for lists
const listSchema = new mongoose.Schema({
  label: String,
  giftList: [entrySchema],
  budget: Number,
  totSpent: Number,
});

// Create a model for lists
const List = mongoose.model('List', listSchema);


app.listen(3002, () => console.log('Server listening on port 3002'));
