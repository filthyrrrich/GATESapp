const router = require("express").Router();
const empController = require("../controllers/empController");
const passport = require('../passport');

// const passport = require('../../controllers/passport');


  // Matches with "/user/login"
router.route('/login')
  .post(passport.authenticate('local'), empController.loginUser);
  
  // Matches with "/user/signup"
router.route('/signup')
  .post(empController.signupUser);

  // Matches with "/user/"
router.route('/')
  .get(empController.getEmployee);

 // Matches with "/user/logout"
router.route('/logout')
  .post(empController.logoutUser);

router.route('/schedule')
  .post(empController.employeeSchedule);

// Matches with "/user/login/:id"
// router
//   .route("/:id")
//   .get(empController.findById)
//   .put(empController.update)
//   .delete(empController.remove);

module.exports = router;







// const router = require("express").Router();
// const empController = require("../../controllers/empController");

// // Matches with "/api/login"
// router.route("/")
//   .get(empController.loginUser)
//   .post(empController.create);

// // Matches with "/api/login/:id"
// router
//   .route("/:id")
//   .get(empController.findById)
//   .put(empController.update)
//   .delete(empController.remove);

// module.exports = router;
