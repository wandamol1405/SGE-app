const express = require("express");
const documentsRouter = express.Router();
const { getDocuments, receivedDocuments } = require("../controllers/documentsController");

documentsRouter.get("/find/:userId", getDocuments);
documentsRouter.get("/received/:userId", receivedDocuments);

module.exports = documentsRouter;
