const Employee = require("../database/models/employee");

module.exports = {

  getEmployee: function(req, res) {
    // console.log('================== employee =======================')
    // console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
  },

  loginUser: function(req, res) {
    // console.log("-----------Controller info:---------", req.user)
    const { firstName, lastName, points, title, schedules, _id } = req.user;
    
    let userInfo = {
      firstName,
      lastName,
      points,
      title,
      schedules,
      _id
    };
    res.send(userInfo);
    //json?
  },

  signupUser: function(req, res) {
    const { username, password, firstName, lastName } = req.body
    Employee
      .findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('Employee.js post error:::::::::::: ', err)
      } else if (user) {
        res.json({
            error: `There's already an employee with the username: ${username}`
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
      res.send({ msg: 'no employee to log out' })
    }
  },

  updatePoints: function(req, res) {
    let updatedPoints = req.body.points 
    console.log("REQ_!_!_!_!_!_", req.body)
    
    switch  (req.body.status) {
      case "Call Out":
         updatedPoints = req.body.points + 1
        break;
      case "Trade Shift":
        updatedPoints = req.body.points 
      break;
      case "Late":
        updatedPoints = req.body.points + 0.5
      break;
    
      default:
        break;
    }

    Employee
      .findOneAndUpdate({_id: req.body.id}, {points: updatedPoints }, {new: true})
      .then(dbEmployeePoints => res.json(dbEmployeePoints));

  },

  getAllEmployees: function(req, res) {
    Employee
      .find({})
      .sort({ lastName: 1})
      .then(dbEmployees => res.json(dbEmployees))
  },

  employeeInfo: function (req, res) {
    Employee
      .findOne({ _id: req.params.id })
      .then(dbEmployeeInfo => res.json(dbEmployeeInfo))
  },

  editEmployee: function (req, res) {
    Employee
      .findOneAndUpdate({ _id: req.body.id}, {
          firstName: req.body.fName, 
          lastName: req.body.lName, 
          title: req.body.title, 
          points: req.body.points
      }, {new: true})
      .then(dbEmployeeInfo => res.json(dbEmployeeInfo))
  }
};

