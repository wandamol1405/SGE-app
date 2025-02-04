const express = require("express");
const { Model } = require("sequelize");
const buyOrderRouter = express.Router();
const {
  getBuyOrders,
  addBuyOrder,
  generateBuyOrderPDF,
} = require("../controllers/buyOrderController");

buyOrderRouter.get("/", getBuyOrders);
buyOrderRouter.post("/", addBuyOrder);
buyOrderRouter.post("/generate-pdf", generateBuyOrderPDF);

module.exports = buyOrderRouter;
