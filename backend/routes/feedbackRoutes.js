const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
// const feedbackDepartmentController = require("../controllers/feedbackController");

router.get("/", feedbackController.getFeedbacks);
router.get("/:deptId", feedbackController.getDepartmentFeedbacks);
// router.get("/", feedbackController.getDepartmentFeedbacks);

module.exports = router;