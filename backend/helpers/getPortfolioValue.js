const getPortfolioValue = (body) => {
	// Body -> Array, with object as schema from stockDataModel
	const bodySize = body.length;
	let portfolioAge = 2000;
	const bodyMap = [];
	for (let i = 0; i < bodySize; i++) {
		const timestamps = JSON.parse(body[i].timestamps);
		const days = timestamps.length;
		portfolioAge = days < portfolioAge ? days : portfolioAge;

		const value = JSON.parse(body[i].value);
		const assetMap = [];
		for (let d = 0; d < days; d++) {
			const obj = {
				timestamp: timestamps[d],
				open: value.open[d],
				close: value.close[d],
				high: value.high[d],
				low: value.low[d],
				volume: value.volume[d],
			};

			assetMap.push(obj);
		}

		bodyMap.push(assetMap);
	}

	// total => [{open, close, high, low}]
	// for each day (loop backward)
	// for each stock in portfolio
	const total = {};
	bodyMap.forEach((assetMap) => {
		assetMap.forEach((dailyVal) => {
			if (!(dailyVal.timestamp in total)) {
				total[String(dailyVal.timestamp)] = {
					open: dailyVal.open,
					close: dailyVal.close,
					high: dailyVal.high,
					low: dailyVal.low,
					num_asset: 1,
				};
			} else {
				total[String(dailyVal.timestamp)].open += dailyVal.open;
				total[String(dailyVal.timestamp)].close += dailyVal.close;
				total[String(dailyVal.timestamp)].high += dailyVal.high;
				total[String(dailyVal.timestamp)].low += dailyVal.low;
				total[String(dailyVal.timestamp)].num_asset += 1;
			}
		});
	});

	return total;
};
