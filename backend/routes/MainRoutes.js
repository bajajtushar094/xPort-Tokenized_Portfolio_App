require("dotenv").config();
const express = require("express");
const authRouter = require("./AuthRoutes");
const PortfolioAdditionRouter = require("./PortfolioAdditionRoutes");

const app = express();

app.use("/auth/", authRouter);
app.use("/portfolio/", PortfolioAdditionRouter);

module.exports = app;


