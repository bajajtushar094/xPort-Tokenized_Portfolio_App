const express = require("express");

const stockDataController = require("../controllers/stockDataController");

const router = express.Router();

router.post("/", stockDataController.getData);
router.post("/getChartValues", stockDataController.getChartValues);
router.get("/getTickers", stockDataController.getTickers);

module.exports = router;
