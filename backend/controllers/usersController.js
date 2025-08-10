const { get } = require("../routes/usersRoutes");

const User = require("../models").User;

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ msg: "Users list", users });
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await User.create(user);

    if (createdUser.id_company) {
      await InvoiceCounter.create({
        company_id: createdUser.id_company,
        invoice_type: "Factura A",
        last_invoice_numer: 0,
      });
      await InvoiceCounter.create({
        company_id: createdUser.id_company,
        invoice_type: "Factura B",
        last_invoice_numer: 0,
      });
      await InvoiceCounter.create({
        company_id: createdUser.id_company,
        invoice_type: "Factura C",
        last_invoice_numer: 0,
      });
      await BuyOrderCounter.create({
        id_company: createdUser.id_company,
        last_buy_order_number: 0,
      });
      await DeliveryNoteCounter.create({
        id_company: createdUser.id_company,
        delivery_note_type: "Remito R",
        last_delivery_note_number: 0,
      });
      await DeliveryNoteCounter.create({
        id_company: createdUser.id_company,
        delivery_note_type: "Remito X",
        last_delivery_note_number: 0,
      });
      await DebitNoteCounter.create({
        id_company: createdUser.id_company,
        debit_note_type: "Nota de Débito A",
        last_debit_note_number: 0,
      });
      await DebitNoteCounter.create({
        id_company: createdUser.id_company,
        debit_note_type: "Nota de Débito B",
        last_debit_note_number: 0,
      });
      await DebitNoteCounter.create({
        id_company: createdUser.id_company,
        debit_note_type: "Nota de Débito C",
        last_debit_note_number: 0,
      });
      await CreditNoteCounter.create({
        id_company: createdUser.id_company,
        credit_note_type: "Nota de Crédito A",
        last_credit_note_number: 0,
      });
      await CreditNoteCounter.create({
        id_company: createdUser.id_company,
        credit_note_type: "Nota de Crédito B",
        last_credit_note_number: 0,
      });
      await CreditNoteCounter.create({
        id_company: createdUser.id_company,
        credit_note_type: "Nota de Crédito C",
        last_credit_note_number: 0,
      });
      await CreditNoteCounter.create({
        id_company: createdUser.id_company,
        last_buy_order_number: 0,
      });
    }

    // Responder con éxito
    res.json({ msg: "User created", user: createdUser });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};

const loginUser = (req, res) => {
  const user = req.body;
  if (!req.session) {
    return res.status(500).json({ msg: "Session is not initialized" });
  }
  req.session.username = user.email;
  res.json({ msg: "User logged in", user });
};

const logoutUser = (req, res) => {
  if (!req.session) {
    return res.status(500).json({ msg: "Session is not initialized" });
  }
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error logging out" });
    } else {
      res.json({ msg: "User logged out" });
    }
  });
};

async function findUser(email) {
  try {
    const userFound = await User.findOne({ where: { email: email } });
    console.log("User found: ", userFound);
    return userFound.toJSON();
  } catch (error) {
    console.error("Error finding user: ", error);
    return false;
  }
}

const getUser = async (req, res) => {
  const { email } = req.params;
  const user = await findUser(email);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json({ msg: "User found", user });
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  logoutUser,
  findUser,
  getUser,
};
