const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const PortfolioAdditionController = require("../controllers/PortfolioAdditionController");

const router = express.Router();

router.post("/addPortfolio", AuthMiddleware.verifyToken, PortfolioAdditionController.addPortfolio);


module.exports = router;
