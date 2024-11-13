const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departmentsController");
// const {
//   getDepartmentHead,
// } = require("");

router.get("/", departmentsController.getAllDepartments);
router.get("/search", departmentsController.searchDepartments);
router.get("/:id", departmentsController.getDepartmentById);
router.get("/:departmentId/head", departmentsController.getDepartmentHead);
router.get(
  "/:departmentId/doctors",
  departmentsController.getDepartmentDoctors
);

module.exports = router;
