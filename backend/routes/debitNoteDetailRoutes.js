const express = require("express");
const { Model } = require("sequelize");
const debitNoteDetailRouter = express.Router();

const {
  addDebitNoteDetail,
} = require("../controllers/debitNoteDetailController");

debitNoteDetailRouter.post("/", addDebitNoteDetail);

module.exports = debitNoteDetailRouter;
