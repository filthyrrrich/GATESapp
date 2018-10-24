const router = require('express').Router()
const scheduleController = require('../controllers/scheduleController');

// Matches with "/schedule"
router.route('/')
    .post(scheduleController.createSchedule)
    .get(scheduleController.getCurrentSchedule);

// Matches with "/schedule/current"
// router.route('/current')
//     .get(scheduleController.getCurrentSchedule);

module.exports = router;