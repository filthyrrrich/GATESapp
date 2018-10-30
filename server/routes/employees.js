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

module.exports = router;