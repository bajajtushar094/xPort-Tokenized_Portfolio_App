const express = require("express");

const stockDataController = require("../controllers/stockDataController");

const router = express.Router();

router.post("/", stockDataController.getData);

module.exports = router;
