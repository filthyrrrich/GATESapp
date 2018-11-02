const router = require("express").Router();
const empController = require("../controllers/empController");
const passport = require('../passport');

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

  // Matches with "/user/points"
router.route('/points')
  .put(empController.updatePoints);

  // Matches with "/user/all"
router.route('/all')
  .get(empController.getAllEmployees);

  // Matches with "/user/:id"
router.route('/:id')
  .get(empController.employeeInfo);
  
  
router.route('/info')
  .put(empController.editEmployee);



module.exports = router;