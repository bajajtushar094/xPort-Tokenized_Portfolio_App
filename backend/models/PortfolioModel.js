const { Schema, model } = require("mongoose");

const PortfolioAsset = new Schema({
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

const PortfolioKPI = new Schema({
	kpi_name: {
		type: String,
		required: true,
	},
	kpi_value: {
		type: String,
		required: true,
	},
	kpi_type: {
		type: String,
		required: true,
	},
});

const Portfolio = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	num_assets: {
		type: Number,
		required: true,
		default: 0,
	},
	valuation: {
		type: Number,
		required: true,
		default: 0,
	},
	assets: [{
		type: Schema.Types.ObjectId,
		ref: "Portfolio Asset"
	}],
	kpis: [{
		type: Schema.Types.ObjectId,
		ref: "Portfolio KPI"
	}],
});

module.exports = model("portfolio", Portfolio);
