const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    date: {type: Date},
    confirmation: {type: Boolean, default: false},
    approvalTime: {type: String, default: null},
    status: {type: String, default: null},
    pending: {type: Boolean, default: false},
    reason: {type: String, default: null}
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

