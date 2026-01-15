const express = require("express");
const { Model } = require("sequelize");
const exportExcelRouter = express.Router();

const {
  exportDataToExcel,
} = require("../controllers/exportExcelController");

exportExcelRouter.get("/", exportDataToExcel);

module.exports = exportExcelRouter;