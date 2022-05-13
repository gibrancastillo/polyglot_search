const daynames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const currentDate = new Date();
const dayName = daynames[currentDate.getDay()];
const monthName = months[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();
const formattedFullDate = `${dayName}, ${currentDate.getDate()} ${monthName} ${currentYear}`;

// document.querySelector("#year").appendChild(document.createTextNode(currentYear));

// document.querySelector("#current_date").textContent = formattedFullDate;
// document.querySelector("#last_updated").textContent = "Last Updated: " + document.lastModified;

document.body.appendChild(document.createElement("center")).innerText = "Last Updated: " + document.lastModified