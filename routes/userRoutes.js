
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('user/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password, name, number} = req.body;
        const user = new User({ email, number, username, name });
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Cu Host');
            res.redirect('/events');
        })
    }
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('user/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome back !!!');
    const redirectURL = res.locals.returnTo || '/events';
    
    res.redirect(redirectURL);
})


router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/events');
    });
}); 



module.exports = router;
