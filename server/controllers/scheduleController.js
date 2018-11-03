const Schedule = require('../database/models/schedule');
const Employee = require('../database/models/employee');

module.exports = {
    createSchedule: function(req, res) {
        
        const newSchedule = new Schedule({
            date: new Date(req.body.date + "T" + req.body.time)
        })
    
        Schedule
            .create(newSchedule)
            .then(dbSchedule => {
                // console.log('New Schedule:', dbSchedule);
                Employee
                    .findOneAndUpdate(
                        { _id: req.body._id }, 
                        { $push: { schedules: dbSchedule._id } },
                        { new: true }
                    )
                    .then(addedSchedule => res.json(addedSchedule))
                    .catch(err => res.status(422).json(err));
            })
    },

    getCurrentSchedule: function(req, res) {
        // console.log("GET CURRENT CONTROLLER",req)
        let today = new Date().toString().split("GMT")[0].slice(0,-10);
        const userID = req.params.id;
    
        Employee
          .findOne({ _id: userID })
          .populate({
              path: "schedules",
              match: { "date": { "$gte": new Date(today) }},
              options: { sort: { "date": 1 }}
          })
          .then(dbEmployee => res.json(dbEmployee));
      },

    getTodaysEmployees: function(req, res) {
        const today = {
            begin: new Date().toString().split("GMT")[0].slice(0,-10),
            end: new Date().toString().split("GMT")[0].slice(0,-10) + " 23:59:59"
        }
        
        Employee
            .find({})
            .populate({
                path: "schedules",
                match: { "date": { "$gte": new Date(today.begin), "$lt": new Date(today.end) }},
                options: { sort: { "date": 1 }}
            })
            .then(dbEmployees => res.json(dbEmployees));
    },

    updateStatus: function(req, res) {
        // console.log("REQ>BODY>ID", req.body.id)
        Schedule
            .findOneAndUpdate({
                _id: req.body.id
                }, {
                    status: req.body.status,
                    reason: req.body.reason, 
                    pending: req.body.pending
                }, {
                    new: true
            })
            .then(dbEmployeeStatus => res.json(dbEmployeeStatus));
    },

    confirmRequest: function(req, res) {
        Schedule
            .findOneAndUpdate({_id: req.body.id}, {confirmation: true, approvalTime: new Date(), pending: false }, {new: true})
            .then(dbEmployeeStatus => res.json(dbEmployeeStatus));
    },

    editSchedule: function(req, res) {
        console.log("REQ>BODY>ID", req.body)
        const alteredDate = new Date(req.body.date + "T" + req.body.time)
        console.log("CONSTRUCT DATE>>>>>", alteredDate)
        Schedule
            .findOneAndUpdate({
                _id: req.body.id
                }, {
                    confirmation: req.body.confirm,
                    status: req.body.status,
                    reason: req.body.reason, 
                    pending: req.body.pending,
                    date: alteredDate
                    
                }, {
                    new: true
            })
            .then(dbEmployeeSchedule => res.json(dbEmployeeSchedule));
    }
}
