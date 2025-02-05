const express = require("express");
const { Model } = require("sequelize");
const deliveryNoteRouter = express.Router();
const {
  getDeliveryNote,
  addDeliveryNote,
  generateDeliveryNotePDF,
} = require("../controllers/deliveryNoteController");

deliveryNoteRouter.get("/", getDeliveryNote);
deliveryNoteRouter.post("/", addDeliveryNote);
deliveryNoteRouter.post("/generate-pdf", generateDeliveryNotePDF);

module.exports = deliveryNoteRouter;
