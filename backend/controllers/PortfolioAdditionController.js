require("dotenv").config();
const UserModel = require("../models/UserModel");
const PortfolioModel = require("../models/PortfolioModel");
const apiResponse = require("../helpers/ApiResponse");
const PortfolioAssetModel = require("../models/PortfolioAssetModel");

exports.addPortfolio = async (req, res) => {
    try{
        const user = req.user;
        const {assets, num_assets, valuation} = req.body;

        const portfolio = new PortfolioModel({
            user:user._id,
            num_assets,
            valuation
        })

        var portfolio_assets = [];
        for (asset of assets){
            console.log("Asset: ", asset)
            const portfolioAsset = new PortfolioAssetModel({
                portfolio: portfolio._id,
                asset_name: asset.asset_name,
                asset_value: asset.asset_value,
                asset_type: asset.asset_type
            });
            await portfolioAsset.save();
            portfolio_assets.push(portfolioAsset);
            // await portfolio.assets.push(portfolioAsset);
        }

        

        portfolio.assets = portfolio_assets;

        await portfolio.save();

        return apiResponse.successResponse(req, res, "Portfolio added");

    }
    catch(err){
        console.log("Error: ", err);
        return apiResponse.errorResponse(req, res, err.message);
    }
}
