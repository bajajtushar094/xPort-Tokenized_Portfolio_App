const mongoose = require("mongoose");

const NotificationModel = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
		portfolio: {
			type: mongoose.Schema.Types.ObjectId,
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
