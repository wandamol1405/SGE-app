const express = require("express");
const { Model } = require("sequelize");
const buyOrderDetailRouter = express.Router();
const {
  addBuyOrderDetail,
} = require("../controllers/buyOrderDetailController");

buyOrderDetailRouter.post("/", addBuyOrderDetail);

module.exports = buyOrderDetailRouter;
