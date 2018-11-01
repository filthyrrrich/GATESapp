const Schedule = require('../database/models/schedule');
const Employee = require('../database/models/employee');

module.exports = {
    createSchedule: function(req, res) {
        // const user_id = '5bcf863e9e7257375b0eab03'
        // const user_id = req.body._id
        const newSchedule = new Schedule({
            date: req.body.date
        })
        console.log('User :', req.body)

        console.log('User ID:', req.body._id)
        console.log('DATE:', req.body.date)

        Schedule
            .create(newSchedule)
            .then(dbSchedule => {
                console.log('New Schedule:', dbSchedule);
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
        console.log("GET CURRENT CONTROLLER",req.user)
        let today = new Date().toString().split("GMT")[0].slice(0,-10);
        const userID = req.user._id;
    
        Employee
          .find({ _id: userID })
          .populate({
              path: "schedules",
              match: { "date": { "$gte": today }},
              options: { sort: { "date": 1 }}
          })
          .then(dbEmployee => res.json(dbEmployee));
      },

    getTodaysEmployees: function(req, res) {
        let today = {
            begin: new Date().toString().split("GMT")[0].slice(0,-17) + "30 2018 18:00:00",
            end: new Date().toString().split("GMT")[0].slice(0,-10) + " 17:59:59"
        }
        console.log("BEGIN", today.begin)
        console.log("BEGIN ADDED", new Date(today.begin))
        console.log("END", today.end)
        console.log("test", new Date().toString().split("GMT")[0].slice(0,-17) + "30 2018 18:00:00")
        // getDay()
        
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
        console.log("REQ>BODY>ID", req.body.id)
        Schedule
            .findOneAndUpdate({_id: req.body.id}, {status: req.body.status, reason: req.body.reason, pending: req.body.pending}, {new: true})
            .then(dbEmployeeStatus => res.json(dbEmployeeStatus));

    },

    confirmRequest: function(req, res) {
        Schedule
            .findOneAndUpdate({_id: req.body.id}, {confirmation: true, approvalTime: new Date() }, {new: true})
            .then(dbEmployeeStatus => res.json(dbEmployeeStatus));
    }





    // getCurrentSchedule: function(req, res) {
    //     console.log("get schedule-----", req.user);
    //     const userID = req.user._id;

    // Employee
    //   .find({ _id: userID })
    //   .populate('schedules')
    //   .then(dbEmployee => res.json(dbEmployee));

        // Schedule
        //     .find({
        //         "date": {
        //             "$gte": new Date(2018,10,1), 
        //             "$lt": new Date(2018,10,30)
        //         }
        //     })
        //     .then(dbFoundSchedule => res.json(dbFoundSchedule))
        //     .catch(err => res.status(422).json(err));
    // }
}

//format for date query search
// db.getCollection('schedules').find({"date": {"$gte": new Date(2018,9,1), "$lt": new Date(2018,9,30)}})


//.then(dbEmployee => res.json(dbFoundSchedule));