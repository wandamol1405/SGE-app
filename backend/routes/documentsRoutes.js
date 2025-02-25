const express = require("express");
const documentsRouter = express.Router();
const { getDocuments } = require("../controllers/documentsController");

documentsRouter.get("/find/:userId", getDocuments);

module.exports = documentsRouter;
