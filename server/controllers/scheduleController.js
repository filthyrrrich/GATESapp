const Schedule = require('../database/models/schedule');
const Employee = require('../database/models/employee');

module.exports = {
    createSchedule: function(req, res) {
        const user_id = '5bcb897852341825ffbdd988'
        console.log('User ID:', user_id)
        Schedule
            .create(req.body)
            .then(dbSchedule => {
                console.log('New Schedule:', dbSchedule);
                Employee
                    .findOneAndUpdate({ _id: user_id }, { $push: { schedules: dbSchedule._id } }, { new: true })
                    .then(res => console.log(res))
                    .catch(err => res.status(422).json(err));
            })

    }
}