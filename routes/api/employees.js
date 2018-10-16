const router = require("express").Router();
const empController = require("../../controllers/empController");

// Matches with "/api/emp"
router.route("/")
  .get(empController.findAll)
  .post(empController.create);

// Matches with "/api/emp/:id"
router
  .route("/:id")
  .get(empController.findById)
  .put(empController.update)
  .delete(empController.remove);

module.exports = router;
