const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User=require('./model/user')

mongoose.connect('mongodb://localhost:27017/authDB')
  .then(() => {console.log('Connected to MongoDB')})
  .catch(()=> {console.error('Could not connect to MongoDB')});



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("home");
});

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/payment', (req, res) => {
  res.render("payment");
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});