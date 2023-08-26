const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: `${__dirname}/../.env` });

const stockDataModel = require("../models/stockDataModel");

// stockDataModel.deleteMany({});

exports.getData = async (req, res) => {
	try {
		const { name } = req.body;
		const data = await stockDataModel.find({ name, region: "IN" });

		if (data && data.length > 1) {
			const today = new Date(Date.now());

			if (data[0].createdAt.getDate() == today.getDate()) {
				return res.json({
					data: data[0],
					success: true,
				});
			} else {
				// TODO: get data from createdAt till Today
				console.log("API called");
				const options = {
					method: "GET",
					url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart",
					params: {
						interval: "1d",
						symbol: name,
						range: "5y",
						region: "IN",
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

				data[0].createdAt = Date.now();
				data[0].value = JSON.stringify(
					response.data.chart.result[0].indicators.quote[0]
				);
				data[0].timestamps = JSON.stringify(
					response.data.chart.result[0].timestamps
				);

				await data[0].save();

				return res.send(data[0]);
			}
		}

		// Call rapid api
		console.log("API called");

		const options = {
			method: "GET",
			url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart",
			params: {
				interval: "1d",
				symbol: name,
				range: "5y",
				region: "IN",
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

		const newData = new stockDataModel({
			name,
			region,
			value: JSON.stringify(
				response.data.chart.result[0].indicators.quote[0]
			),
			timestamps: JSON.stringify(
				response.data.chart.result[0].timestamps
			),
			createdAt: Date.now(),
		});

		await newData.save();
		res.send(newData);
	} catch (error) {
		console.log(error);
		res.send({ error });
	}
};
