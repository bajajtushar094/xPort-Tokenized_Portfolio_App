require("dotenv").config();
const UserModel = require("../models/UserModel");
const PortfolioModel = require("../models/PortfolioModel");
const apiResponse = require("../helpers/ApiResponse");
const PortfolioAssetModel = require("../models/PortfolioAssetModel");
const UserPortfolioModel = require("../models/UserPortfolioModel");
const NotificationModel = require("../models/NotificationModel");

var ObjectId = require("mongodb").ObjectId;

const { sendMail } = require("../helpers/mailer");
const { getPortfolioValue } = require("../helpers/getPortfolioValue");

const {submitPrivateMessage} = require("../hedera_controllers/AddPortfolio");
const {purchasePortfolio} = require("../hedera_controllers/BuyPortfolio");
const {costPortfolioTransaction} = require("../hedera_controllers/HbarTransaction");
const stockDataModel = require("../models/stockDataModel");
const PortfolioKPIModel = require("../models/PortfolioKPIModel");

exports.addPortfolio = async (req, res) => {
	try {
		const user_id = req.user._id;
		const user = await UserModel.findOne({ _id: user_id });
		console.log("user id ", user_id);
		console.log("user: ", user);
		const { assets, num_assets, valuation, name, tagline, costPortfolio, assetIds } =
			req.body;

		console.log("Assets ids: ", assetIds);

		const portfolio = new PortfolioModel({
			owner_user: user,
			num_assets,
			name,
			tagline,
			valuation,
			costPortfolio
		});

		var portfolio_assets = [];
		var stockDataArray = [];

		for (asset of assets) {
			// console.log("Asset: ", asset);
			console.log("assetId: ", asset.stock_id);
			const stockData = await stockDataModel.findOne({_id:asset.stock_id});
			console.log("StockData: ", stockData);
			const portfolioAsset = new PortfolioAssetModel({
				// portfolio: portfolio,
				asset_name: asset.asset_name,
				asset_value: asset.asset_value,
				asset_type: asset.asset_type,
				stock_id: asset.stock_id
			});
			await portfolioAsset.save();
			portfolio_assets.push(portfolioAsset);
			stockDataArray.push(stockData);
		}

		portfolio.assets = portfolio_assets;

		console.log("StockData Array: ", stockDataArray);


		const portfolio_chart = getPortfolioValue(stockDataArray);

		const portfolio_kpi = new PortfolioKPIModel({
			portfolio_id:portfolio._id,
			kpi_name:"portfolio_chart",
			kpi_value:portfolio_chart
		})
		console.log("Portfolio Chart: ", portfolio_kpi);

		await portfolio_kpi.save();

		const topicId = await submitPrivateMessage(
			user.accountId,
			user.privateKey,
			portfolio
		);

		portfolio.topicId = topicId.toString();

		await portfolio.save();

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

		// console.log("Portfolio ID: ", ObjectId.isValid(portfolio_id));

		const portfolio = await PortfolioModel.findOne({
			_id: new ObjectId(portfolio_id),
		});
		if (!portfolio) {
			return apiResponse.notFoundResponse(
				req,
				res,
				`Portfolio with id: ${id} not found`
			);
		}

		console.log("Portfolio fetched from _id: ", portfolio);
		if (portfolio.owner_user == user._id) {
			return apiResponse.forbiddenResponse(req, res, {
				message: "You can not buy your own portfolio",
				success: false,
			});
		}

		const owner_user = await UserModel.findOne({'_id':portfolio.owner_user});

		// console.log("Owner User: ", owner_user);
		var user = await UserModel.findOne({'_id':user._id})
		console.log("User from buy portfolio: ", user);
		console.log("Owner User for portfolio: ",owner_user);

		await costPortfolioTransaction(user.accountId, user.privateKey, owner_user.accountId, owner_user.privateKey, portfolio.costPortfolio);

		await purchasePortfolio(user.accountId, user.privateKey, portfolio.topicId);

		user = await UserModel.findOne({ _id: user._id });

		console.log("User model after buying portfolio: ", user);

		user.portfolios_bought.push(portfolio);

		await user.save();

		await portfolio.save();

		return apiResponse.successResponseWithData(
			req,
			res,
			"Bought Portfolio",
			{
				success: true,
			}
		);
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
	}
};

exports.getPortfolio = async (req, res) => {};
