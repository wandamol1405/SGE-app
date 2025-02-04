const BuyOrderDetail = require("../models").BuyOrderDetail;

const addBuyOrderDetail = async (req, res) => {
  const buyOrderDetail = req.body;
  await BuyOrderDetail.create(buyOrderDetail);
  res.json({ msg: "Buy order detail created", buyOrderDetail });
};

module.exports = { addBuyOrderDetail };
