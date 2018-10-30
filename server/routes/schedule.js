const router = require('express').Router()
const scheduleController = require('../controllers/scheduleController');

// Matches with "/schedule/"
router.route('/')
    .post(scheduleController.createSchedule)
    .get(scheduleController.getCurrentSchedule);

// Matches with "/schedule/today"
router.route('/today')
    .get(scheduleController.getTodaysEmployees);

// Matches with "/schedule/status"
router.route('/status')
    .put(scheduleController.updateStatus);

// Matches with "/schedule/confirm"
router.route('/confirm')
    .put(scheduleController.confirmRequest);

module.exports = router;