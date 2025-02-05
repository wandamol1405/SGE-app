const DebitNoteDetail = require("../models").DebitNoteDetail;

const addDebitNoteDetail = async (req, res) => {
  const debitNoteDetail = req.body;
  await DebitNoteDetail.create(debitNoteDetail);
  res.json({ msg: "Debit note detail created", debitNoteDetail });
};

module.exports = { addDebitNoteDetail };
