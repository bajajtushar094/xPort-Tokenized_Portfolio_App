const dotenv = require("dotenv");
const axios = require("axios");
const apiResponse = require("../helpers/ApiResponse");

dotenv.config({ path: `${__dirname}/../.env` });

const stockDataModel = require("../models/stockDataModel");
const PortfolioKPIModel = require("../models/PortfolioKPIModel");

// stockDataModel.deleteMany({});

exports.getData = async (req, res) => {
	try {
		const name = req.body.name.trim();
		console.log("TICKER:", name);
		const region = "IN";
		const data = await stockDataModel.find({ name, region: "IN" });

		if (data && data.length > 1) {
			const today = new Date(Date.now());

			if (data[0].createdAt.getDate() == today.getDate()) {
				return apiResponse.successResponseWithData(req, res, "data for stock", data[0]);;
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

				// console.log("response from rapid api: ", response.data.chart.result[0]);

				data[0].createdAt = Date.now();
				data[0].value = JSON.stringify(
					response.data.chart.result[0].indicators.quote[0]
				);
				data[0].timestamps = JSON.stringify(
					response.data.chart.result[0].timestamp
				);

				await data[0].save();

				return apiResponse.successResponseWithData(req, res, "data for stock", data[0]);;
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

			console.log("response from rapid api: ", response.data);

			const newData = new stockDataModel({
				name,
				region,
				value: JSON.stringify(
					response.data.chart.result[0].indicators.quote[0]
				),
				timestamps: JSON.stringify(
					response.data.chart.result[0].timestamp
				),
				createdAt: Date.now(),
			});

			await newData.save();
			return apiResponse.successResponseWithData(req, res, "data for stock", newData);;
	} catch (error) {
		console.log(error);
		return apiResponse.errorResponse(req, res, error.message);
	}
};

exports.getChartValues = async (req, res) => {
	try{
		const {portfolio_id} = req.body;

		const portfolio_kpi = await PortfolioKPIModel.findOne({portfolio_id:portfolio_id});

		const kpi_value = portfolio_kpi.kpi_value;

		// console.log("keys of kpi: ", Object.keys(kpi_value));

		const total_data = [];

		const open_data = [];
		const close_data = [];
		const x_axis = [];

		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		var key;

		for(key in kpi_value){
			var date = new Date(Number(key)*1000);
			var date_format = date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear();

			if(date.getDate()==28&&months[date.getMonth()]=='Dec'){
				x_axis.push(String(date.getFullYear()));
			}
			else if(date.getDate()==31){
				x_axis.push(months[date.getMonth()]);
			}
			else{
				x_axis.push('');
			}
			var month = months[date.getMonth()];
			// x_axis.push(date);
			open_data.push(kpi_value[key].open);
			close_data.push(kpi_value[key].close);
			// graph_data.push(rowData);


			var rowData = [];
			rowData.push(key);
			rowData.push(kpi_value[key].open);
			rowData.push(kpi_value[key].close);
			total_data.push(rowData);
		}

		// const date = new Date(Number(key));
		// var date_format = date.getDate() + '/' +  date.getMonth() + '/' + date.getFullYear();

		console.log("Last date for kpi value: ", kpi_value['1693461621']);

		graph_data = {
			"x_axis":x_axis,
			"open_data":open_data,
			"close_data":close_data,
			"total_data":total_data
		}

		return apiResponse.successResponseWithData(req, res, "portfolio kpi values", graph_data);
	}
	catch(error){
		console.log(error);
		return apiResponse.errorResponse(req, res, error.message);
	}
}


exports.getTickers = async (req, res) => {
	try{
		const options = {
			method: 'GET',
			url: 'https://twelve-data1.p.rapidapi.com/stocks',
			params: {
			  country: 'IN',
			  exchange: 'NSE',
			  format: 'json'
			},
			headers: {
				"X-RapidAPI-Key": process.env.RAPID_API_KEY,
				"X-RapidAPI-Host": process.env.TICKER_RAPID_API_HOST,
			}
		};

		const response = await axios.request(options);

		

		const companies = response.data.data;
		const ticker_data = [];

		console.log(typeof(companies));

		// console.log("response from ticker API: ", companies);

		for(company of companies){
			const obj = {};
			obj.ticker = company.symbol + ".NS";
			obj.name = company.name;

			ticker_data.push(obj);
		}

		return apiResponse.successResponseWithData(req, res, "tickers for companies", ticker_data);
		  

		
	}
	catch(err){
		console.log(err);
		return apiResponse.errorResponse(req, res, err.message);
	}
}