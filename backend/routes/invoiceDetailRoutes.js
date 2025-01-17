const express = require("express");
const { Model } = require("sequelize");
const invoiceDetailRouter = express.Router();

const { addInvoiceDetail } = require("../controllers/invoiceDetailController");

invoiceDetailRouter.post("/", addInvoiceDetail);

module.exports = invoiceDetailRouter;
