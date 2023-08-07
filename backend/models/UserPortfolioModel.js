const mongoose = require("mongoose");

const UserPortfolioModel = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	portfolio: {
		type: Schema.Types.ObjectId,
		ref: "portfolio",
	},
});

module.exports = mongoose.model("userPortfolio", UserPortfolioModel);
