const formatDate = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setDate(formattedDate.getDate() + 1);
  return `${formattedDate.getDate().toString().padStart(2, "0")}/${(
    formattedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${formattedDate.getFullYear()}`;
};

export default formatDate;
