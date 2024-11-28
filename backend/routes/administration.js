const express = require("express");
const router = express.Router();
const {
  getAdministartors,
} = require("../controllers/administrationController");

router.get("/administration", getAdministartors);

module.exports = router;
