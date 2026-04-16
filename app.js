const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcrypt'); // for password hashing

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/authDB')
  .then(() => { console.log('Connected to MongoDB'); })
  .catch(() => { console.error('Could not connect to MongoDB'); });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("home");
});

app.get('/signup', (req, res) => {
  res.render("signup");
});
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  let existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.redirect('/signup'); // Redirect back to signup if username already exists
  }

  const saltRounds = 10; // Number of rounds for salting
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await User.create({ username, password: hashedPassword, email });

  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/payment', (req, res) => {
  res.render('payment');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
