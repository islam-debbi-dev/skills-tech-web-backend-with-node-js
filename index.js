const express = require('express');
const auth = require('./routes/auth');
const dotenv = require('dotenv');
const connectDB = require('./middlewares/conn-db');

dotenv.config();

const app = express();
const port = 3000;

// hna srali mochkel brk ,ga3ed ytawal w huwa yverifier connection w mb3d 
// ygouli error chuflna lmochkel ya islem
// ghirha kolch raw ymchiw riglo
// seha 3idk 3yniya
// connectDB();

app.use(express.json());
app.use("/auth",auth);

app.listen(port, () => {
  console.log(` localhost:${port}/`);
});