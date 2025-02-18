const Account = require("../models").Account;

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({
      order: [["type", "ASC"]],
    });
    res.json({ msg: "Accounts list", accounts });
  } catch (error) {
    console.error("Error al obtener las cuentas:", error);
    res.status(500).json({ error: "Error al obtener las cuentas." });
  }
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
