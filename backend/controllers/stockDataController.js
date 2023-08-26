const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: `${__dirname}/../.env` });

const stockDataModel = require("../models/stockDataModel");

exports.getData = async (req, res) => {
	try {
		const { name, region } = req.body;
		const data = await stockDataModel.find({ name, region });

		if (data && data.length > 1) {
			if (data[0].createdAt == Date.now()) {
				return res.send(200).json({
					data: data[0],
					success: true,
				});
			} else {
				// TODO: get data from createdAt till Today
			}
		}

		// Call rapid api
		const options = {
			method: "GET",
			url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart",
			params: {
				interval: "1d",
				symbol: name,
				range: "5y",
				region: region,
				includePrePost: "false",
				useYfid: "true",
				includeAdjustedClose: "true",
				events: "capitalGain,div,split",
			},
			headers: {
				"X-RapidAPI-Key": process.env.RAPID_API_KEY,
				"X-RapidAPI-Host": process.env.RAPID_API_HOST,
			},
		};

		const response = await axios.request(options);
		console.log(response.data);
		res.send(response.data);
	} catch (error) {}
};
