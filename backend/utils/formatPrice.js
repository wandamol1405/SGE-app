const formatPrice = (price) => {
  return parseFloat(price).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
  });
};

module.exports = formatPrice;
