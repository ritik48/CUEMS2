const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Event name cannot be empty']
    },
    image: {
        type: String,
        required: [true, 'Even image is required']
    },
    date: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: [true, 'Specify atleast one tag']
    },
    description: {
        type: String,
        required: [true, 'Event description cannot be empty']
    },
    club: {
        type: String,
    },
    contact: {
        type: [String],
        required: true
    },
    number: {
        type: Number
    },
    venue: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema);


