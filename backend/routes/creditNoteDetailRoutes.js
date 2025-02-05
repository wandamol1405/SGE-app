const express = require("express");
const { Model } = require("sequelize");
const creditNoteDetailRouter = express.Router();

const {
  addCreditNoteDetail,
} = require("../controllers/creditNoteDetailController");

creditNoteDetailRouter.post("/", addCreditNoteDetail);

module.exports = creditNoteDetailRouter;
