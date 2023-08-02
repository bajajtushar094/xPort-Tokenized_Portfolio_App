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
});

module.exports = model("user", User);
