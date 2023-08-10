require("dotenv").config();
const UserModel = require("../models/UserModel");
const PortfolioModel = require("../models/PortfolioModel");
const apiResponse = require("../helpers/ApiResponse");
const PortfolioAssetModel = require("../models/PortfolioAssetModel");
const UserPortfolioModel = require("../models/UserPortfolioModel");
const NotificationModel = require("../models/NotificationModel");

const { sendMail } = require("../helpers/mailer");

exports.addPortfolio = async (req, res) => {
	try {
		const user = req.user;
		const { assets, num_assets, valuation, name, tagline } = req.body;

		const portfolio = new PortfolioModel({
			// owner_user:user,
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

		await portfolio.save();

		return apiResponse.successResponse(req, res, "Portfolio added");
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
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
		const { portfolio_id } = req.body;
		const user = req.user;

		const portfolio = await PortfolioModel.findById({ portfolio_id });
		if (!portfolio) {
			return apiResponse.notFoundResponse(
				req,
				res,
				`Portfolio with id: ${id} not found`
			);
		}
		if (portfolio.owner_user._id == user._id) {
			return apiResponse.forbiddenResponse(req, res, {
				message: "You can not buy your own portfolio",
				success: false,
			});
		}

		// const unique = await UserPortfolioModel.find({
		// 	user: user._id,
		// 	portfolio,
		// });

		user.portfolios_bought.push(portfolio);

		await user.save();

		portfolio.buyer_user.push(user);

		await portfolio.save();

		// const boughtPortfolio = new UserPortfolioModel({
		// 	user: user._id,
		// 	portfolio,
		// });

		return apiResponse.successResponseWithData(
			req,
			res,
			"Bought Portfolio",
			{
				success: true,
				boughtPortfolio,
			}
		);
	} catch (err) {
		console.log("Error: ", err);
		return apiResponse.errorResponse(req, res, err.message);
	}
};

exports.getPortfolio = async (req, res) => {};
