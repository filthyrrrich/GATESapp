const router = require("express").Router();
const empRoutes = require("./employees");

// Employee routes
router.use("/emp", empRoutes);

module.exports = router;
