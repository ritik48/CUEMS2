const express = require('express');
const router = express.Router();

const Event = require('../models/events');
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utils/catchAsync');


router.get('/', async (req, res) => {
    const events = await Event.find({});
    res.render('index/discover', { events });
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('events/new');
})

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);
    console.log(event)
    req.flash('success', 'Event succssfull deleted !!!');
    res.redirect('/events');

}))

router.post('/new', async (req, res) => {
    const { tags } = req.body;
    const tag_list = tags.split(',');
    
    const event = new Event({...req.body, tags: tag_list});
    console.log(event);

    await event.save();

    res.redirect('/events');
})

router.get('/:id', catchAsync(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if(!event) {
        req.flash('error', 'Could not find that event !!!');
        return res.redirect('/events');
    }

    res.render('events/show', { event });
}));


module.exports = router;