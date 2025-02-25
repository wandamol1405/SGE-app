const formatDocNumber = (docNumber) => {
  return docNumber.toString().padStart(8, "0");
};

export default formatDocNumber;
