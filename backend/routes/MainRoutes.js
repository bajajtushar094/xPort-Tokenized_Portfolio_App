require("dotenv").config();
const express = require("express");
const authRouter = require("./AuthRoutes");
const PortfolioAdditionRouter = require("./PortfolioAdditionRoutes");
const StockDataRouter = require("./stockDataRoutes");

const app = express();

app.use("/auth/", authRouter);
app.use("/portfolio/", PortfolioAdditionRouter);
app.use("/stockData/", StockDataRouter);

module.exports = app;
