const { Schema, model } = require("mongoose");

const PortfolioKPI = new Schema({
	portfolio_id:{
		type: Schema.Types.ObjectId
	},
	kpi_name: {
		type: String,
		required: true,
	},
	kpi_value: {
		type: Object,
		required: true,
	}
});

module.exports = model("portfolioKPI", PortfolioKPI);
