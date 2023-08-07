const mongoose = require("mongoose");

const UserPortfolioModel = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	portfolio: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "portfolio",
	},
});

module.exports = mongoose.model("userPortfolio", UserPortfolioModel);
