const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

router.get("/",(req, res)=>{
    res.send('hello');
} )

module.exports = router;