const DebitNoteReceived = require("../models").DebitNoteReceived;
const User = require("../models").User;

const getDebitNotesReceived = async (req, res) => {
  const debitNotesReceived = await DebitNoteReceived.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
    ],
  });
  res.json({ msg: "Debit notes received list", debitNotesReceived });
};

const getDebitNotesReceivedByCompany = async (req, res) => {
  const companyId = req.params.id;
  const debitNotesReceived = await DebitNoteReceived.findAll({
    where: { company_id: companyId },
  });
  res.json({ msg: "Debit notes received list", debitNotesReceived });
};

const addDebitNoteReceived = async (req, res) => {
  try {
    const { newDebitNote } = req.body;
    const createdDebitNote = await DebitNoteReceived.create(newDebitNote);
    res.json({ msg: "Debit note received created", createdDebitNote });
  } catch (error) {
    res.json({ msg: "Error", error });
  }
};

module.exports = {
  getDebitNotesReceived,
  getDebitNotesReceivedByCompany,
  addDebitNoteReceived,
};
