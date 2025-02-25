const formatPointSale = (pointSale) => {
  return String(pointSale).padStart(4, "0");
};

module.exports = formatPointSale;
