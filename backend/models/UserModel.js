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
	accountId:{
		type: String,
	},
	privateKey: {
		type: String,
	},
	porfolios_owned: [{
		type: Object
	}],
	portfolios_bought:[{
		type: Object
	}],
	userDetails: {
		type: Object,
		ref: "UserDetailModel"
	}
});

module.exports = model("user", User);
