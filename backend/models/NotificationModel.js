const mongoose = require("mongoose");

const NotificationModel = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		users: [],
		portfolio: {
			type: Object,
			ref: "portfolio",
		},
		createdOn: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

NotificationModel.index({ createdOn: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("notification", NotificationModel);
