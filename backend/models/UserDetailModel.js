const { Schema, model } = require("mongoose");

const UserDetail = new Schema({
	name: {
		type: String,
		required: true,
	},
	pancard: {
		type: String,
		required: true,
	},
	aadhar_card: {
		type: String,
		required: true,
	},
	// pancard: {
	// 	type: String,
	// 	required: true,
	// },
	// aadhar: {
	// 	type: String,
	// 	required: true,
	// },
	// user: {
	// 	type: Object,
	// 	ref: "user",
	// 	required: true,
	// },
	verified: {
		type: Boolean,
		required: true,
		default: false,
	},
	email: {
		type: String,
	},
});

module.exports = model("userDetail", UserDetail);
