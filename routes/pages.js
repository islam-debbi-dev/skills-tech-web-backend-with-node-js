const express = require('express');
const router = express.Router();

// get login page
router.get('/login', (req, res) => {
    res.render('auth/login.ejs', {
        title: 'Secure Login Portal',
        heading: 'Member Login',
        formAction: '/login'
    });
});

// get sign-up page
router.get('/sign-up', (req, res) => {
    res.render('../pages/sign-up.ejs', {
        title: 'Secure Sign Up Portal',
        formAction: '/sign-up'
    });
});



// get student home page
router.get('/student/home', (req, res) => {
    res.render('student/home.ejs', {
        username: req.query.username,
    });
});
// get teacher home page
router.get('/teacher/home', (req, res) => {
    res.render('teacher/home.ejs', {
        username: req.query.username,
    });
});



// get forget-password page
router.get('/forget-password', (req, res) => {
    res.render('../pages/forget-password.ejs', {
        title: 'Reset Password'
    });
});
// get reste password page
router.get('/reset-password', (req, res) => {
    console.log(req.query.username);
    console.log(req.query.token);
    res.render('../pages/reset-password.ejs', {
        title: 'Reset Password',
        username: req.query.username,
        token: req.query.token
    });
});

module.exports = router;