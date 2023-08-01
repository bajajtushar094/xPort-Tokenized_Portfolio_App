const { Schema, model } = require("mongoose");

const PortfolioAsset = new Schema({
	portfolio: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	asset_name: {
		type: String,
		required: true,
	},
	asset_type: {
		type: String,
		required: true,
	},
	asset_value: {
		type: Number,
		required: true,
	},
});

module.exports = model("portfolioAsset", PortfolioAsset);
