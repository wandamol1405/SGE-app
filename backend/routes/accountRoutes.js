const express = require("express");
const accountRouter = express.Router();
const { getAccounts, addAccount } = require("../controllers/accountController");

accountRouter.get("/", getAccounts);
accountRouter.post("/", addAccount);

module.exports = accountRouter;
