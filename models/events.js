const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Event name cannot be empty"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    date: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: [true, "Specify atleast one tag"],
    },
    description: {
        type: String,
        required: [true, "Event description cannot be empty"],
    },
    club: {
        type: String,
    },
    contact: {
        type: [{
            socialName: String,
            socialLink: String
        }],
        required: true,
    },
    number: {
        type: Number,
    },
    venue: {
        type: String,
        required: true,
    },
});

eventSchema.methods.getDate = function () {
    const [year, month, day] = this.date.split("-");

    // Note: Months are zero-based in JavaScript Date objects, so we subtract 1 from the month
    const jsDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
    );

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthIndex = jsDate.getMonth();
    const monthName = months[monthIndex];

    const date_ = jsDate.getDate();

    return `${monthName} ${date_}`
};

module.exports = mongoose.model("Event", eventSchema);
