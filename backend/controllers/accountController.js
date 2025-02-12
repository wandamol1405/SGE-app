const Account = require("../models").Account;

const getAccounts = async (req, res) => {
  const accounts = await Account.findAll();
  res.json({ msg: "Accounts list", accounts });
};

const addAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.json({ msg: "Account created", account });
  } catch (error) {
    console.error("Error al agregar la cuenta:", error);
    res.status(500).json({ error: "Error al agregar la cuenta." });
  }
};

module.exports = {
  getAccounts,
  addAccount,
};
