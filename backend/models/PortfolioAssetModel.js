const { Schema, model } = require("mongoose");

const PortfolioAsset = new Schema({
	// portfolio: {
	// 	type: Object,
	// 	required: true,
	// 	ref: "Portfolio"
	// },
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
	stock_id: {
		type: Schema.Types.ObjectId,
		ref: "stockData"
	}
});

module.exports = model("portfolioAsset", PortfolioAsset);
