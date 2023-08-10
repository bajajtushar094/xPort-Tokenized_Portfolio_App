const { Schema, model } = require("mongoose");

const User = new Schema({
	password: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	porfolios_owned: [],
	portfolios_bought:{}
});

module.exports = model("user", User);
