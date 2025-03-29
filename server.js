// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');const { connectDB } = require('./middlewer/connect_db.js');

const app = express();
const port = 3000;

// connect mongoose
await connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(` localhost:${port}/`);
});