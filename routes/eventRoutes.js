const express = require("express");
const router = express.Router();

const Event = require("../models/events");
const { isLoggedIn } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./static/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 500);
        return cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    const events = await Event.find({});
    res.render("index/discover", { events });
});

router.get("/new", (req, res) => {
    res.render("events/new");
});

router.get(
    "/category/:category",
    catchAsync(async (req, res) => {
        const { category } = req.params;
        let events = "";
        if (category == "all") {
            events = await Event.find({});
        } else {
            events = await Event.find({
                tags: { $regex: new RegExp(category, "i") },
            });
        }

        res.json(events);
    })
);

router.get(
    "/search/:event_title",
    catchAsync(async (req, res) => {
        const { event_title } = req.params;
        let events = "";

        if (event_title == "all") {
            events = await Event.find({});
        } else {
            events = await Event.find({
                name: { $regex: event_title, $options: "i" },
            });
        }
        res.json(events);
    })
);

router.delete(
    "/:id",
    isLoggedIn,
    catchAsync(async (req, res) => {
        const event = await Event.findByIdAndDelete(req.params.id);
        console.log(event);
        req.flash("success", "Event succssfull deleted !!!");
        res.redirect("/events");
    })
);

router.post(
    "/new",
    upload.single("image"),
    catchAsync(async (req, res) => {
        const { tags } = req.body;
        const tag_list = tags.split(",");

        const socialName = req.body.social["social-name"];
        const socialLink = req.body.social["social-link"];

        let contacts = [];

        for (let i = 0; i < socialName.length; i++) {
            const contactInfo = {
                socialName: socialName[i],
                socialLink: socialLink[i],
            };
            contacts.push(contactInfo);
        }

        const event = new Event({
            ...req.body,
            tags: tag_list,
            contact: contacts,
        });
        console.log(event);
        event.image = req.file.filename;
        await event.save();

        res.redirect("/events");
    })
);

router.get(
    "/:id",
    catchAsync(async (req, res) => {
        const event = await Event.findById(req.params.id);
        console.log(event);
        if (!event) {
            req.flash("error", "Could not find that event !!!");
            return res.redirect("/events");
        }

        res.render("events/show", { event });
    })
);

module.exports = router;
