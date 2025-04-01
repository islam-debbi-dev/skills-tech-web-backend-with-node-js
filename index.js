const dotenv = require('dotenv');
const express = require('express');
const auth = require('./routes/auth');
const project = require('./routes/project');
const proposal = require('./routes/proposal');
const connectDb = require('./middleware/connactDb');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
dotenv.config();


// connect database
connectDb();

// routes
app.use("/api/auth",auth);
app.use("/api/project",project);
app.use("/api/proposal",proposal);




app.listen(port, () => {
  console.log(` localhost:${port}/`);
});