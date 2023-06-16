function dateStringToDateObject(dateString) {
  // var dateString = "14/6/2023 14:25";
  var dateParts = dateString.split(" ");
  var date = dateParts[0].split("/");
  var time = dateParts[1].split(":");
  var year = parseInt(date[2]);
  var month = parseInt(date[1]) - 1; // Months in JavaScript are zero-based
  var day = parseInt(date[0]);
  var hour = parseInt(time[0]);
  var minute = parseInt(time[1]);

  var dateObject = new Date(year, month, day, hour, minute);
  return dateObject;
}

export default dateStringToDateObject;
