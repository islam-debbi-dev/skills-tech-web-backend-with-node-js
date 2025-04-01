const dotenv = require('dotenv');
const express = require('express');
const auth = require('./routes/auth');
const connectDb = require('./middleware/connactDb');
const port = 3000;
const app = express();
app.use(express.json());
dotenv.config();


// connect database
connectDb();

// routes
app.use("/auth",auth);


app.listen(port, () => {
  console.log(` localhost:${port}/`);
});