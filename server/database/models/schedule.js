const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    // This date is going to include day & time
    date: {
        type: String
    },

    confirmation: {
        type: Boolean
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;