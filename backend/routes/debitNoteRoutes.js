const express = require("express");
const { Model } = require("sequelize");
const debitNoteRouter = express.Router();
const {
  getDebitNote,
  addDebitNote,
  generateDebitNotePDF,
  getDebitNoteByCompany,
} = require("../controllers/debitNoteController");

debitNoteRouter.get("/", getDebitNote);
debitNoteRouter.post("/", addDebitNote);
debitNoteRouter.post("/generate-pdf", generateDebitNotePDF);
debitNoteRouter.get("/find/:id", getDebitNoteByCompany);

module.exports = debitNoteRouter;
