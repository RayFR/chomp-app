const express = require("express");
const router = express.Router();

const { handlePost } = require("../controllers/mainController.js");

router.post("/", handlePost);

module.exports = router;