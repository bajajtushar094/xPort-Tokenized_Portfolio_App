const { Schema, model } = require("mongoose");

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

module.exports = model("portfolioKPI", PortfolioKPI);
