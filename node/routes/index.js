const express = require('express');
const router = express.Router();

const { startMessage } = require("../controllers/indexController.js");

router.get('/', startMessage);

module.exports = router;