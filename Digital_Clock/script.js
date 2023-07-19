"use strict";

const time = document.querySelector(".heading-time");
const date = document.querySelector(".heading-date");
const btnSwitch = document.querySelector(".btn--switch");
let formatH = false;

const monthNames = [
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
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeFnc = function () {
  // setting the date
  const dateNow = new Date();
  const day = dateNow.getDate();
  const dayNr = dateNow.getDay();
  const month = dateNow.getMonth();
  const year = dateNow.getFullYear();
  console.log(dateNow);

  date.textContent = `${weekday[dayNr]}, ${day + "th"} ${
    monthNames[month]
  } ${year}`;

  // setting the time
  const hour = dateNow.getHours();
  const minutes = dateNow.getMinutes();
  const seconds = dateNow.getSeconds();

  if (!formatH) {
    time.textContent = `${hour}:${minutes > 9 ? minutes : "0" + minutes}:${
      seconds > 9 ? seconds : "0" + seconds
    }`;
  } else {
    const am = hour / 12 > 1 || hour / 12 === 0 ? false : true;
    time.textContent = `${am > 0 ? hour : hour !== 0 ? hour - 12 : hour}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${seconds > 9 ? seconds : "0" + seconds} ${am > 0 ? "AM" : "PM"}`;
  }
};

setInterval(timeFnc, 1000);

// switching format
btnSwitch.addEventListener("click", function () {
  formatH = formatH === false ? true : false;
});
