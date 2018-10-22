const Employee = require("../database/models/employee");
// const passport = require('../passport');

// Defining methods for the empController
module.exports = {
  getEmployee: function(req, res) {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
  },
  loginUser: function(req, res) {
        console.log("Controller info:", req.user)
        const { firstName, lastName, points } = req.user;
        var userInfo = {
          //all object data for front end
          firstName,
          lastName,
          points
        };
        res.send(userInfo);
    //json?

  },
  signupUser: function(req, res) {

    const { username, password, firstName, lastName } = req.body
    // ADD VALIDATION
    Employee.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new Employee({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })

  },
  logoutUser: function(req, res) {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
  },

  employeeSchedule: function(req, res) {
    const userID = req.body._id;

    Employee
      .find({ _id: userID })
      .populate('schedules')
      .then(dbEmployee => res.json(dbEmployee));

  }
 
};






// const db = require("../models");

// // Defining methods for the empController
// module.exports = {
//   loginUser: function(req, res) {
//     db.Employee
//       .findOne({ email: req.email})
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   // findById: function(req, res) {
//   //   db.Employee
//   //     .findById(req.params.id)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // create: function(req, res) {
//   //   db.Employee
//   //     .create(req.body)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // update: function(req, res) {
//   //   db.Employee
//   //     .findOneAndUpdate({ _id: req.params.id }, req.body)
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // },
//   // remove: function(req, res) {
//   //   db.Employee
//   //     .findById({ _id: req.params.id })
//   //     .then(dbModel => dbModel.remove())
//   //     .then(dbModel => res.json(dbModel))
//   //     .catch(err => res.status(422).json(err));
//   // }
// };