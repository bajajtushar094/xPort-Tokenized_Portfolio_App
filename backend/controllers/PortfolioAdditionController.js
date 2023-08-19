require("dotenv").config();
const UserModel = require("../models/UserModel");
const PortfolioModel = require("../models/PortfolioModel");
const apiResponse = require("../helpers/ApiResponse");
const PortfolioAssetModel = require("../models/PortfolioAssetModel");
const UserPortfolioModel = require("../models/UserPortfolioModel");
const NotificationModel = require("../models/NotificationModel");

var ObjectId = require('mongodb').ObjectId;

const { sendMail } = require("../helpers/mailer");

const {submitPrivateMessage} = require("../hedera_controllers/AddPortfolio");
const {purchasePortfolio} = require("../hedera_controllers/BuyPortfolio");

exports.addPortfolio = async (req, res) => {
	try {
		const user_id = req.user._id;
		const user = await UserModel.findOne({'_id':user_id})
		console.log("user id ", user_id);
		console.log("user: ", user)
		const { assets, num_assets, valuation, name, tagline } = req.body;

		const portfolio = new PortfolioModel({
			owner_user:user,
			num_assets,
			valuation,
			name,
			tagline
		});

		var portfolio_assets = [];
		for (asset of assets) {
			// console.log("Asset: ", asset);
			const portfolioAsset = new PortfolioAssetModel({
				// portfolio: portfolio,
				asset_name: asset.asset_name,
				asset_value: asset.asset_value,
				asset_type: asset.asset_type,
			});
			await portfolioAsset.save();
			portfolio_assets.push(portfolioAsset);
			// await portfolio.assets.push(portfolioAsset);
		}

		portfolio.assets = portfolio_assets;
		// user.portfolios_owned = [];
		// console.log("Portfolios owned: ", user.portfolios_owned);

		// user.portfolios_owned.push(portfolio);

		// await user.save();

		const topicId = await submitPrivateMessage(user.accountId, user.privateKey, portfolio);

		portfolio.topicId = topicId.toString();

		await portfolio.save();

		console.log("topicId for portfolio: ", topicId);

		return apiResponse.successResponse(req, res, "Portfolio added");
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err);
	}
};

exports.getAllPortfolio = async (req, res) => {
	try {
		const portfolios = await PortfolioModel.find({});

		return apiResponse.successResponseWithData(
			req,
			res,
			"Success",
			portfolios
		);
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
	}
};

exports.editPortfolio = async (req, res) => {
	try {
		const { assets, num_assets, valuation } = req.body;
		const id = req.params.id;
		const user = req.user;

		const portfolio = await PortfolioModel.findById(id);
		if (!portfolio) {
			return apiResponse.notFoundResponse(
				req,
				res,
				`Portfolio with id: ${id} not found`
			);
		}
		if (user._id != portfolio.owner_user._id) {
			return apiResponse.unauthorizedResponse(
				req,
				res,
				"Unauthorized to change the portfolio"
			);
		}
		const portfolioBuyers = portfolio.buyer_users;

		await PortfolioAssetModel.deleteMany({
			_id: { $in: portfolio.assets },
		});

		var portfolio_assets = [];
		for (asset of assets) {
			console.log("Asset: ", asset);
			const portfolioAsset = new PortfolioAssetModel({
				portfolio: portfolio,
				asset_name: asset.asset_name,
				asset_value: asset.asset_value,
				asset_type: asset.asset_type,
			});
			await portfolioAsset.save();
			portfolio_assets.push(portfolioAsset);
		}

		portfolio.assets = portfolio_assets;

		await portfolio.save();

		// TODO: Notify users
		// var buyerIDs = [];
		// portfolioBuyers.forEach((buyer) => {
		// 	buyerIDs.push(buyer._id);
		// });
		const users = await UserModel.find({ _id: { $in: buyerIDs } });
		const newNotification = new NotificationModel({
			message: `There has been changes to the portfolio bought by you, please rebalance`,
			portfolio: portfolio,
			users: portfolioBuyers,
		});

		// TODO: user mailing script to send mail to users
		// ? : Where are user emails saved?
		sendMail([], newNotification);

		return apiResponse.successResponse(req, res, "Portfolio added");
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
	}
};

exports.buyPortfolio = async (req, res) => {
	try {
		var { portfolio_id } = req.body;
		var user = req.user;
		console.log("User from buy portfolio: ", user);

		// console.log("Portfolio ID: ", ObjectId.isValid(portfolio_id));

		const portfolio = await PortfolioModel.findOne({ '_id': new ObjectId(portfolio_id) });
		if (!portfolio) {
			return apiResponse.notFoundResponse(
				req,
				res,
				`Portfolio with id: ${id} not found`
			);
		}

		console.log("Portfolio fetched from _id: ", portfolio);
		if (portfolio.owner_user._id == user._id) {
			return apiResponse.forbiddenResponse(req, res, {
				message: "You can not buy your own portfolio",
				success: false,
			});
		}

		await purchasePortfolio(user.accountId, user.privateKey, portfolio.topicId);


		user = await UserModel.findOne({'_id':user._id});

		console.log("User model after buying portfolio: ", user);

		user.portfolios_bought.push(portfolio);

		await user.save();

		await portfolio.save();

		return apiResponse.successResponseWithData(
			req,
			res,
			"Bought Portfolio",
			{
				success: true
			}
		);
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
	}
};

exports.getPortfolio = async (req, res) => {};
