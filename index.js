const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');

const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const Event = require('./models/events');
const events = require('./models/events');

mongoose.connect('mongodb://127.0.0.1:27017/cuhost')
    .then(() =>{
        console.log("CONNECTION ESTABLISHED.")
    })
    .catch(err => {
        console.log("Error while connecting !!!");
    })


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: true}));
const methodOverride = require('method-override');

app.use(methodOverride('_method'))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/events', eventRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found !!!', 404));
})

app.use((err, req, res, next) => {
    const { status=500 } = err;
    if(!err.message) err.message = 'Something Went Wrong !!!';
    // res.status(status).render('error', { err });
    res.status(status).send(err.message);
    // req.flash('error', err.message);
    // res.redirect('/events');
})

app.listen(1234, () => {
    console.log("LISTENING ON 1234...");
})






// app.listen(3000, () => {
//     console.log("LISTENING ON PORT 3000 ....");
// })
