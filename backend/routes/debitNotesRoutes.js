const express = require("express");
const debitNoteReceivedRouter = express.Router();
const {
  addDebitNoteReceived,
  getDebitNotesReceived,
  getDebitNotesReceivedByCompany,
} = require("../controllers/debitNotesReceivedController");

debitNoteReceivedRouter.get("/", getDebitNotesReceived);
debitNoteReceivedRouter.get("/find/:id", getDebitNotesReceivedByCompany);
debitNoteReceivedRouter.post("/", addDebitNoteReceived);

module.exports = debitNoteReceivedRouter;
