const express = require("express");
const { Model } = require("sequelize");
const deliveryNoteDetailRouter = express.Router();

const {
  addDeliveryNoteDetail,
} = require("../controllers/deliveryNoteDetailController");

deliveryNoteDetailRouter.post("/", addDeliveryNoteDetail);

module.exports = deliveryNoteDetailRouter;
