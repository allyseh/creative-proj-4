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

/* Schemas */

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
  //img: String,   //path to img
  editDisplay: Boolean,
});

// Create a model for gifts
const Gift = mongoose.model('Gift', giftSchema);

// Create a scheme for list entries
const entrySchema = new mongoose.Schema({
  receiver: personSchema,
  gift: giftSchema,     //[giftSchema]
  editDisplay: Boolean,
});

// Create a model for list entries
const Entry = mongoose.model('Entry', entrySchema);

// Create a scheme for lists       --- no time to implement..
const listSchema = new mongoose.Schema({
  label: String,
  giftList: [entrySchema],
  budget: Number,
  totSpent: Number,
  editDisplay: Boolean,
});

// Create a model for lists
const List = mongoose.model('List', listSchema);


/* Person api calls */

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
    person.gender = req.body.gender;
    person.age = req.body.age;
    person.relation = req.body.relation;
    person.likes = req.body.likes;
    person.editDisplay = req.body.editDisplay;
    await person.save();
    res.send(person);
  } 
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


/* Gift api calls */

// Create a new gift in the giftList
app.post('/api/gifts', async (req, res) => {
  const gift = new Gift({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    editDisplay: req.body.editDisplay,
  });
  try {
    await gift.save();
    res.send(gift);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the people 
app.get('/api/gifts', async (req, res) => {
  try {
    let gifts = await Gift.find();
    res.send(gifts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/gifts/:id', async (req, res) => {
  try {
    await Gift.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/gifts/:id', async (req, res) => {
  try {
    let gift = await Gift.findOne({
      _id: req.params.id
    });
    gift.title = req.body.title;
    gift.desc = req.body.desc;
    gift.price = req.body.price;
    gift.editDisplay = req.body.editDisplay;
    await gift.save();
    res.send(gift);
  } 
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/* Entry api calls */

// Create a new entry in the giftList
app.post('/api/entries', async (req, res) => {
  const entry = new Entry({
    receiver: req.body.receiver,
    gift: req.body.gift,
    editDisplay: req.body.editDisplay,
  });
  try {
    await entry.save();
    res.send(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the people 
app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Entry.find();
    res.send(entries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/entries/:id', async (req, res) => {
  try {
    let entry = await Entry.findOne({
      _id: req.params.id
    });
    entry.receiver = req.body.receiver;
    entry.gift = req.body.gift;
    entry.editDisplay = req.body.editDisplay;
    await entry.save();
    res.send(entry);
  } 
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3002'));
