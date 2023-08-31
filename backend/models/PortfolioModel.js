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
	owner_user: {
		type: Object,
		ref: "user",
	},
	// buyer_users: [],
	name: {
		type: String,
	},
	tagline: {
		type: String,
	},
	num_assets: {
		type: Number,
		default: 0,
	},
	valuation: {
		type: Number,
		default: 0,
	},
	costPortfolio:{
		type:Number,
		default: 0
	},
	assets: [],
	kpis: [],
	topicId: {
		type: String,
	},
	portfolio_chart: {
		type: Object,
	},
});

module.exports = model("portfolio", Portfolio);
