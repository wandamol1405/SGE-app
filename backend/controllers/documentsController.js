const Invoice = require("../models").Invoice;
const DeliveryNote = require("../models").DeliveryNote;
const CreditNote = require("../models").CreditNote;
const DebitNote = require("../models").DebitNote;
const BuyOrder = require("../models").BuyOrder;
const Cheque = require("../models").Cheque;
const PromissoryNote = require("../models").PromissoryNote;

const getDocuments = async (req, res) => {
  const userId = req.params.userId;
  const invoices = await Invoice.findAll({ where: { id_company: userId } });
  const deliveryNotes = await DeliveryNote.findAll({
    where: { id_company: userId },
  });
  const creditNotes = await CreditNote.findAll({
    where: { id_company: userId },
  });
  const debitNotes = await DebitNote.findAll({ where: { id_company: userId } });
  const buyOrders = await BuyOrder.findAll({ where: { id_company: userId } });
  const cheques = await Cheque.findAll({ where: { id_company: userId } });
  const promissoryNotes = await PromissoryNote.findAll({
    where: { id_company: userId },
  });

  const documents = {
    invoices,
    deliveryNotes,
    creditNotes,
    debitNotes,
    buyOrders,
    cheques,
    promissoryNotes,
  };

  res.json({ documents });
};

module.exports = { getDocuments };
