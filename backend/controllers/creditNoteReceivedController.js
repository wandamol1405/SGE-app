const CreditNoteReceived = require("../models").CreditNoteReceived;
const User = require("../models").User;

const getCreditNotesReceived = async (req, res) => {
  const creditNotesReceived = await CreditNoteReceived.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: ["id_user", "company_name"],
      },
    ],
  });
  res.json({ msg: "Credit notes received list", creditNotesReceived });
};

const getCreditNotesReceivedByCompany = async (req, res) => {
  const companyId = req.params.id;
  const creditNotesReceived = await CreditNoteReceived.findAll({
    where: { company_id: companyId },
  });
  res.json({ msg: "Credit notes received list", creditNotesReceived });
};

const addCreditNoteReceived = async (req, res) => {
  try {
    const { newCreditNote } = req.body;
    const createdCreditNote = await CreditNoteReceived.create(newCreditNote);
    res.json({ msg: "Credit note received created", createdCreditNote });
  } catch (error) {
    res.json({ msg: "Error", error });
  }
};

module.exports = {
  getCreditNotesReceived,
  getCreditNotesReceivedByCompany,
  addCreditNoteReceived,
};
