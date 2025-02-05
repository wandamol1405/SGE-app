const CreditNoteDetail = require("../models").CreditNoteDetail;

const addCreditNoteDetail = async (req, res) => {
  const creditNoteDetail = req.body;
  await CreditNoteDetail.create(creditNoteDetail);
  res.json({ msg: "Credit note detail created", creditNoteDetail });
};

module.exports = { addCreditNoteDetail };
