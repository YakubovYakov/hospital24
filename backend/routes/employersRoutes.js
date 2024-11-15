const express = require("express");
const router = express.Router();
const employersController = require("../controllers/employersController");
const employersDescriptionController = require("../controllers/employersDescriptionController");
const employersPhotoController = require("../controllers/employersPhotoController");
const employersExperienceController = require("../controllers/employersExperienceController");
const employersPostController = require("../controllers/employersPostController");

// Используем метод из импортированного контроллера
router.get("/", employersController.getAllEmployers);
router.get("/search", employersController.searchEmployers);
router.get("/:id", employersController.getEmployerById);
router.get(
  "/:id/description",
  employersDescriptionController.getEmployerDescriptionById
);
router.get("/:id/photos", employersPhotoController.getEmployerPhotosById);
router.get(
  "/:id/experience",
  employersExperienceController.getEmployerExperienceById
);
router.get("/:id/posts", employersPostController.getEmployerPostsById);

router.get("/:id/main-post", employersPostController.getMainEmployerPostById);

module.exports = router;
