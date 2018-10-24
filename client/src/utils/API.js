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
        return axios.post("/user/logout")
    },

    // Gets employee schedule from db
    getEmployeeSchedule: function(id) {
        let loginInfo = {
            _id: id
        }
        return axios.get("/schedule", loginInfo)
    },

    // Gets current specified date range schedule
    // getEmployeeCurrentSchedule: function(id) {
    //     let loginInfo = {
    //         _id: id
    //     }
    //     return axios.get("/schedule/current", loginInfo)
    // }

   
};










// import axios from 'axios';

// export default {
//     //Retrieves Employee
//     employeeLogin: function() {
//         return axios.get("/api/login");
//       }
//     // // Saves an article to the database
//     // saveArticle: function(articleData) {
//     //     return axios.post("/api/articles", articleData)
//     // },
//     // // Retrieves saved articles from the db
//     // getSavedArticles: function() {
//     //     return axios.get("/api/articles");
//     // }
//     // // // Deletes an article from the db
//     // // deleteArticle: function (id) {
//     // //     return axios.delete(`/api/saved/${id}`);
//     // }
// };