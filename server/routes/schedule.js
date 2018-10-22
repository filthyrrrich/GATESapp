const router = require('express').Router()
const scheduleController = require('../controllers/scheduleController');

router.route('/')
    .post(scheduleController.createSchedule);

module.exports = router;