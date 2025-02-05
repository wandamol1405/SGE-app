const express = require("express");
const { Model } = require("sequelize");
const debitNoteRouter = express.Router();
const {
  getDebitNote,
  addDebitNote,
  generateDebitNotePDF,
} = require("../controllers/debitNoteController");

debitNoteRouter.get("/", getDebitNote);
debitNoteRouter.post("/", addDebitNote);
debitNoteRouter.post("/generate-pdf", generateDebitNotePDF);

module.exports = debitNoteRouter;
