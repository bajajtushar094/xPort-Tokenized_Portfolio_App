const mongoose = require("mongoose");

const stockDataModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
});

module.exports = mongoose.model("stockData", stockDataModel);
