const express = require('express');
const app = express();
const auth = require('./routes/auth');

app.use("/auth",auth);

const port = 3000;

app.listen(port, () => {
  console.log(` localhost:${port}/`);
});