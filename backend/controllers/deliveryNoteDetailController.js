const DeliveryNoteDetail = require("../models").DeliveryNoteDetail;

const addDeliveryNoteDetail = async (req, res) => {
  const deliveryNoteDetail = req.body;
  await DeliveryNoteDetail.create(deliveryNoteDetail);
  res.json({ msg: "Delivery note detail created", deliveryNoteDetail });
};

module.exports = { addDeliveryNoteDetail };
