const mongoose = require('mongoose');

const Event = require('./models/events');

mongoose.connect('mongodb://127.0.0.1:27017/cuhost')
    .then(() =>{
        console.log("CONNECTION ESTABLISHED.")
    })
    .catch(err => {
        console.log("Error while connecting !!!");
    })


const insertData = async () => {
    await Event.deleteMany();

    await Event.insertMany([
    {
        name: 'Start-Up Guide',
        date: 'April 26th',
        description: 'Workshop on how to start a startup',
        tags: ['workshop', 'guidance'],
        club: 'CSE',
        contact: ['linkedin', 'gmail'],
        number: '6786564512',
        image: '1.jpg',
        venue: 'B1 - 315'
    },
    {
        name: 'Airbus Hackathon',
        date: 'March 24',
        description: 'Airbus is back again with 5th edition of the netional level Hackathon',
        tags: ['Hackathon', 'National'],
        club: 'NA',
        contact: ['linkedin', 'gmail'],
        number: '9006564512',
        image: '2.jpg',
        venue: 'B1 - 515'
    },
    {
        name: 'Think Tank Ideathon',
        date: 'April 24',
        description: "CU's biggest ideathon all domains invited",
        tags: ['Ideathon', 'All Domain'],
        club: 'AIML Society',
        contact: ['linkedin', 'gmail'],
        number: '8986564512',
        image: '3.jpg',
        venue: 'B1 - 405'
    },
    {
        name: 'Open Mic',
        date: 'April 13',
        description: "Debate club organised by spectrum society",
        tags: ['Debate'],
        club: 'Spectrum Debate',
        contact: ['linkedin', 'gmail'],
        number: '6546564512',
        image: '4.jpg',
        venue: 'B3 - 615'
    },
    {
        name: 'Curiosity Camp',
        date: 'April 24',
        description: "Organised by innovatica club",
        tags: ['Programme'],
        club: 'Innovatica',
        contact: ['linkedin', 'gmail'],
        number: '8210564512',
        image: '5.jpg',
        venue: 'B1 - 415'
    },
    {
        name: 'Photography Contest',
        date: 'April 24',
        description: "Organised by younfg orator club",
        tags: ['Photography'],
        club: 'Young Orator Club',
        contact: ['linkedin', 'gmail'],
        number: '6240564512',
        image: '6.jpg',
        venue: 'B1 - 402'
    },
    {
        name: 'Baisakhi Blossoms',
        date: 'April 13',
        description: "Organised by uic cultural",
        tags: ['Dancing', 'Singing', 'Cultural'],
        club: 'UIC Cultural',
        contact: ['linkedin', 'gmail'],
        number: '9300564512',
        image: '7.jpg',
        venue: 'DD6'
    },
    {
        name: 'Chase The Code 1.0',
        date: 'April 13',
        description: "Organised for 1st year cse students",
        tags: ['Competition', 'Fresher'],
        club: 'NA',
        contact: ['linkedin', 'gmail'],
        number: '9840564512',
        image: '8.jpg',
        venue: 'C1 - Seminal Hall'
    },
])
    .then((x) => console.log(x))
    .catch((err) => console.log(err));
}

insertData()
.then(() => mongoose.disconnect());

