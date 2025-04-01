const express = require('express');
const app = express();
const auth = require('./routes/auth');
const connectDb = require('./middleware/connactDb');
const port = 3000;
// connect database
connectDb();

// routes
app.use("/auth",auth);


// port listening
app.listen(port, () => {
  console.log(` localhost:${port}/`);
});