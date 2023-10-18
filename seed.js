const mongoose = require("mongoose");

const Event = require("./models/events");

mongoose
    .connect("mongodb://127.0.0.1:27017/cuhost")
    .then(() => {
        console.log("CONNECTION ESTABLISHED.");
    })
    .catch((err) => {
        console.log("Error while connecting !!!");
    });

const insertData = async () => {
    await Event.deleteMany();
    const c = [
        {
            socialName: "linkedin",
            socialLink: "https://linkedin.com/raj-ritik",
        },
    ];

    await Event.insertMany([
        {
            name: "Start-Up Guide",
            date: "203-04-26",
            description: "Workshop on how to start a startup",
            tags: ["workshop", "guidance"],
            club: "CSE",
            contact: c,
            number: "6786564512",
            image: "1.jpg",
            venue: "B1 - 315",
        },
        {
            name: "Airbus Hackathon",
            date: "2023-04-23",
            description:
                "Airbus is back again with 5th edition of the netional level Hackathon",
            tags: ["Hackathon", "National"],
            club: "NA",
            contact: c,
            number: "9006564512",
            image: "2.jpg",
            venue: "B1 - 515",
        },
        {
            name: "Think Tank Ideathon",
            date: "2023-01-21",
            description: "CU's biggest ideathon all domains invited",
            tags: ["Ideathon", "All Domain"],
            club: "AIML Society",
            contact: c,
            number: "8986564512",
            image: "3.jpg",
            venue: "B1 - 405",
        },
        {
            name: "Open Mic",
            date: "2023-04-15",
            description: "Debate club organised by spectrum society",
            tags: ["Debate"],
            club: "Spectrum Debate",
            contact: c,
            number: "6546564512",
            image: "4.jpg",
            venue: "B3 - 615",
        },
        {
            name: "Curiosity Camp",
            date: "2023-03-9",
            description: "Organised by innovatica club",
            tags: ["Programme"],
            club: "Innovatica",
            contact: c,
            number: "8210564512",
            image: "5.jpg",
            venue: "B1 - 415",
        },
        {
            name: "Photography Contest",
            date: "2023-03-9",
            description: "Organised by younfg orator club",
            tags: ["Photography"],
            club: "Young Orator Club",
            contact: c,
            number: "6240564512",
            image: "6.jpg",
            venue: "B1 - 402",
        },
        {
            name: "Baisakhi Blossoms",
            date: "2023-9-11",
            description: "Organised by uic cultural",
            tags: ["Dancing", "Singing", "Cultural"],
            club: "UIC Cultural",
            contact: c,
            number: "9300564512",
            image: "7.jpg",
            venue: "DD6",
        },
        {
            name: "Chase The Code 1.0",
            date: "2023-11-25",
            description: "Organised for 1st year cse students",
            tags: ["Competition", "Fresher"],
            club: "NA",
            contact: c,
            number: "9840564512",
            image: "8.jpg",
            venue: "C1 - Seminal Hall",
        },
    ])
        .then((x) => console.log(x))
        .catch((err) => console.log(err));
};

insertData().then(() => mongoose.disconnect());
