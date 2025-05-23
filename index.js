const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const auth = require('./routes/auth');
const user = require('./routes/user');
const project = require('./routes/project');
const page = require('./routes/pages');
const proposal = require('./routes/proposal');
const group = require('./routes/group');
const groupProposal = require('./routes/groupProposal');

const connectDb = require('./middleware/connactDb');
const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
dotenv.config();


// connect database
connectDb();

// View engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs") 

// routes
app.use("/api/auth",auth);
app.use("/api/user",user);
app.use("/api/project",project);
app.use("/api/proposal",proposal);
app.use("/",page);
app.use('/api/group', group);
app.use('/api/groupProposal', groupProposal);




// error handler when page not found
app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
  
// error handler at server side 
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).render("error", { title: "An error on the server.", error: err });
// });

app.listen(port, () => {
  console.log(`http://localhost:${port}/login`);
});