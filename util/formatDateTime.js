const formatDateTime = (date) => {
  let tempDate = new Date(date);
  let fDate =
    tempDate.getDate() +
    "/" +
    (tempDate.getMonth() + 1) +
    "/" +
    tempDate.getFullYear();
  let fTime =
    tempDate.getHours() +
    ":" +
    (tempDate.getMinutes() <= 9
      ? "0" + tempDate.getMinutes()
      : tempDate.getMinutes());

  return fDate + " " + fTime;
};

export default formatDateTime;