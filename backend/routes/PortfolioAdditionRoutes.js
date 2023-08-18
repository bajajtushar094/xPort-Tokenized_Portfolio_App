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
	"/buyPortfolio",
	AuthMiddleware.verifyToken,
	PortfolioAdditionController.buyPortfolio
);
router.get("/:id", PortfolioAdditionController.getPortfolio);
router.post(
	"/:id",
	AuthMiddleware.verifyToken,
	PortfolioAdditionController.editPortfolio
);

module.exports = router;
