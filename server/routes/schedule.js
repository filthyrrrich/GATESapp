const router = require('express').Router()
const scheduleController = require('../controllers/scheduleController');

// Matches with "/schedule/"
router.route('/')
    .post(scheduleController.createSchedule);

// Matches with "/schedule/today"
router.route('/today')
    .get(scheduleController.getTodaysEmployees);

// Matches with "/schedule/status"
router.route('/status')
    .put(scheduleController.updateStatus);

// Matches with "/schedule/confirm"
router.route('/confirm')
    .put(scheduleController.confirmRequest);

// Matches with "/schedule/edit"
router.route('/edit')
    .put(scheduleController.editSchedule);

// Matches with "/schedule/:id"
router.route('/:id')
    .get(scheduleController.getCurrentSchedule);

module.exports = router;