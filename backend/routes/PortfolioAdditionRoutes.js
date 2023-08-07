const express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const PortfolioAdditionController = require("../controllers/PortfolioAdditionController");

const router = express.Router();

router.get("/", PortfolioAdditionController.getAllPortfolio);
router.post(
	"/addPortfolio",
	AuthMiddleware.verifyToken,
	PortfolioAdditionController.addPortfolio
);
router.post(
	"/buy/:id",
	AuthMiddleware.verifyToken,
	PortfolioAdditionController.buyPortfolio
);
router.post(
	"/edit/:id",
	AuthController.verifyToken,
	PortfolioAdditionController.editPortfolio
);
router.get("/:id", PortfolioAdditionController.getPortfolio);

module.exports = router;
