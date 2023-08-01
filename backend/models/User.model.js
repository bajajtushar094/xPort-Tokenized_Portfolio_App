const { Schema, model } = require("mongoose");

const User = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
});

module.exports = model("user", User);
