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
  editDisplay: Boolean,
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


// Create a new person in the giftList
app.post('/api/persons', async (req, res) => {
  const person = new Person({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    relation: req.body.relation,
    likes: req.body.likes,
    editDisplay: req.body.editDisplay,
  });
  try {
    await person.save();
    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the people 
app.get('/api/persons', async (req, res) => {
  try {
    let persons = await Person.find();
    res.send(persons);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/persons/:id', async (req, res) => {
  try {
    let person = await Person.findOne({
      _id: req.params.id
    });
    person.name = req.body.name;
    console.log(person.name);
    person.gender = req.body.gender;
    console.log(person.gender);
    person.age = req.body.age;
    console.log(person.age);
    person.relation = req.body.relation;
    console.log(person.relation);
    person.likes = req.body.likes;
    console.log(person.likes);
    person.editDisplay = req.body.editDisplay;
    console.log(person.editDisplay);
    await person.save();
    res.send(person);
  } 
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3002'));
