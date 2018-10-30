const axios = require('axios');

export default {
    
    // Checks for employee logged in
    employeeCheck: function() {
        return axios.get("/user")
    },

    //Retrieves Employee
    employeeLogin: (name, pass, first, last) => {
        let loginInfo = {
            username: name,
            password: pass,
            firstName: first,
            lastName: last
        }
        return axios.post("/user/login", loginInfo);
    },

    // Signup Employee
    employeeSignup: function(name, pass, first, last) {
        let loginInfo = {
            username: name,
            password: pass,
            firstName: first,
            lastName: last
        }
        return axios.post("/user/signup", loginInfo)
    },
    
    // Logs employee out
    employeeLogout: function() {
        return axios.post("/user/logout");
    },

    // Gets employee schedule from db
    getEmployeeSchedule: function(id) {
        let loginInfo = {
            _id: id
        }
        return axios.get("/schedule", loginInfo);
    },

    // Gets list of all employees working today
    employeesScheduledToday: function(begin, end) {
        let theDay = {
            begin: begin,
            end: end
        }
        console.log("the day=============", theDay)
        return axios.get("/schedule/today", theDay);
    },

    // Updates employees status request
    updateEmployeeStatus: function(id, status, reason, pending) {
        let employee = {
            id: id,
            status: status,
            reason: reason,
            pending: pending
        }
        return axios.put("/schedule/status", employee);
    },

    // Managers confirm request
    confirmEmployeeRequest: function(id) {
        let employee = {
            id: id
        }
        return axios.put("/schedule/confirm", employee);
    },

    // Updates employees points based on request
    updateEmployeePoints: function(id, points, status) {
        let employee = {
            id: id,
            points: points,
            status: status
        }
        return axios.put("/user/points", employee);

    }
};

