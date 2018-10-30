const Schedule = require('../database/models/schedule');
const Employee = require('../database/models/employee');

module.exports = {
    createSchedule: function(req, res) {
        const user_id = '5bcf863e9e7257375b0eab03'
        console.log('User ID:', user_id)
        Schedule
            .create(req.body)
            .then(dbSchedule => {
                console.log('New Schedule:', dbSchedule);
                Employee
                    .findOneAndUpdate(
                        { _id: user_id }, 
                        { $push: { schedules: dbSchedule._id } },
                        { new: true }
                    )
                    .then(res => console.log(res))
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
              match: { "date": { "$gte": new Date(today) }},
              options: { sort: { "date": 1 }}
          })
          .then(dbEmployee => res.json(dbEmployee));
      },

    getTodaysEmployees: function(req, res) {
        let today = {
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