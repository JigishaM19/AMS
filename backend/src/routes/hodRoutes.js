const express = require("express");
const router = express.Router();

const hodController = require("../controllers/hodController");

// Example endpoints
router.post("/create", hodController.createHod);
router.get("/", hodController.getAllHods);

module.exports = router;
