"use strict";

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prenexIcons = document.querySelectorAll(".calendar-navigation span");

// Array of month names
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
  "December",
];

// Function to generate the calendar
const manipulate = () => {
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();

  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  // Variable to store the generated calendar HTML
  let lit = "";

  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // Check if the current date is today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }

  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  // Update the text of the current date element
  // with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;

  // update the HTML of the dates element
  // with the generated calendar
  day.innerHTML = lit;
};

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener("click", () => {
    // Check if the icon is "calendar-prev"
    // or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the
      // month with the new year
      date = new Date(year, month, new Date().getDate());

      // Set the year to the new year
      year = date.getFullYear();

      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }

    // Call the manipulate function to
    // update the calendar display
    manipulate();
  });
});

//////////////////////////////////////////////////////////////

// Variables
const movements_list = document.querySelector(".movements-container");
const btnAdd = document.querySelector(".btn-add");
const btnShowFuture = document.querySelector("input[name=checkbox]");
const slider = document.querySelector(".slider");
const btnSort = document.querySelector(".btn-sort");

const locale = navigator.locale;

let movements;
let past = true;
let sum = 0;
let sorted = false;

// Functions
const displayYear = function () {
  document.querySelector(".year").textContent = year;
};

const saveData = function () {
  localStorage.setItem("movements", JSON.stringify(movements));
};

const loadData = function () {
  movements = JSON.parse(localStorage.getItem("movements")) || [];
};

const addMovements = function (el) {
  el.display = true;
  sum += +el.price;
  return `<div class="movement-row">
  <div class="movement-row-date">${el.date.slice(8, 10)}-${el.date.slice(
    5,
    7
  )}-${el.date.slice(0, 4)}</div>
  <div class="movement-row-category ${
    el.category
  }">${el.category.toUpperCase()}</div>
  <div class="movement-row-name">${
    el.about[0].toUpperCase() + el.about.slice(1)
  }</div>
  <div class="movement-row-price">${el.price}</div>
  <button class="btn btn-delete" id="${el.id}">X</button>
  </div>`;
};

const displaySum = function () {
  document.querySelector(".sum").textContent = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "pln",
  }).format(sum);
};

const retDate = function (el) {
  const dateStr = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return (
    dateStr -
    new Date(el.date.slice(0, 4), el.date.slice(5, 7) - 1, el.date.slice(8, 10))
  );
};

const sortFunc = function () {
  // create array of arrays [data, id, price]
  const sorting = movements.map((el) => [el.date, el.id]);

  // sorting
  sorting.sort();

  if (!past) {
    sorting.reverse();
  }

  let movementsSorted = [];
  for (let i = 0; i < sorting.length; i++) {
    movementsSorted[i] = movements.find((el) => el.id === sorting[i][1]);
  }
  movements = movementsSorted;
};

const deleteItem = function () {
  document.querySelectorAll(".btn-delete").forEach((btn) =>
    btn.addEventListener("click", function (e) {
      const toDelete = movements.findIndex((el) => el.id == e.target.id);
      movements.splice(toDelete, 1);
      saveData();
      displayItems(movements);
    })
  );
};

const displayItems = function (mov) {
  movements_list.innerHTML = "";
  sum = 0;
  if (past && !sorted) {
    mov.forEach((el) =>
      retDate(el) >= 0
        ? movements_list.insertAdjacentHTML("afterbegin", addMovements(el))
        : (el.display = false)
    );
  } else if (!past && !sorted) {
    mov.forEach((el) =>
      retDate(el) < 0
        ? movements_list.insertAdjacentHTML("afterbegin", addMovements(el))
        : (el.display = false)
    );
  } else if (sorted) {
    sorted = false;
    mov.forEach((el) =>
      movements_list.insertAdjacentHTML("afterbegin", addMovements(el))
    );
  }
  displaySum();
  deleteItem();
};

const init = function () {
  displayYear();
  loadData();
  sortFunc();
  displayItems(movements);
};
init();

const dateOrPrice = function (value, arr) {
  // arr without 0
  arr = arr.filter((el) => el !== 0);

  const sorting = arr.map((el) => [el.date, el.id, el.price]);

  if (value === "0") return arr;

  if (value === "date-descending") {
    sorting.sort();
  } else if (value === "date-increasing") {
    sorting.sort();
    sorting.reverse();
  } else if (value === "price-descending") {
    sorting.sort((a, b) => a[2] - b[2]);
  } else if ((value = "price-increasing")) {
    sorting.sort((a, b) => b[2] - a[2]);
  }

  let movementsSorted = [];
  for (let i = 0; i < sorting.length; i++) {
    movementsSorted[i] = movements.find((el) => el.id === sorting[i][1]);
  }

  return movementsSorted;
};

// Event Listeners
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const date = document.getElementById("new-mov-date").value;
  const category = document.getElementById("new_category").value;
  const about = document.getElementById("new-mov-about").value;
  const price = document.getElementById("new-mov-price").value;

  if (date !== "" && category !== 0 && about !== "" && price !== "") {
    const newItem = {
      date,
      category,
      about,
      price,
      id: movements.length > 0 ? movements.length + 1 : 1,
      display: true,
    };
    movements.push(newItem);
    document.querySelector(".new-movement").reset();
    saveData();
    sortFunc();
    displayItems(movements);
  }
});

btnShowFuture.addEventListener("change", function () {
  if (this.checked) {
    past = false;
    sortFunc();
    displayItems(movements);
  } else {
    past = true;
    sortFunc();
    displayItems(movements);
  }
});

slider.addEventListener("mouseover", function () {
  document.querySelector("h2").classList.remove("hidden");
});

slider.addEventListener("mouseout", function () {
  document.querySelector("h2").classList.add("hidden");
});

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sorted = true;
  const month = document.getElementById("month").value;
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;

  let newMovements = [];
  if (!month && category === "0" && sort === "0") {
    sorted = false;
    past = true;
    sortFunc();
    displayItems(movements);
    return;
  }

  if (month) {
    movements.forEach((el) => (el.display = true));
    newMovements = movements.map((el) =>
      el.date.slice(0, 7) === month ? el : 0
    );
    if (category !== "0") {
      newMovements = newMovements.map((el) =>
        el.category === category ? el : 0
      );
    }
    newMovements = dateOrPrice(sort, newMovements);
  } else {
    if (category !== "0") {
      newMovements = movements.map((el) => (el.category === category ? el : 0));
      newMovements = dateOrPrice(sort, newMovements);
    } else {
      sorted = false;
      newMovements = dateOrPrice(sort, movements);
    }
  }
  displayItems(newMovements);
  document.querySelector(".sorting").reset();
});

document
  .querySelector(".calendar-container")
  .addEventListener("click", function (e) {
    const day =
      +e.target.textContent >= 10
        ? e.target.textContent
        : `0${e.target.textContent}`;
    const monthAndYear = document.querySelector(
      ".calendar-current-date"
    ).textContent;

    const month =
      months.indexOf(`${monthAndYear.slice(0, -5)}`) + 1 >= 10
        ? months.indexOf(`${monthAndYear.slice(0, -5)}`) + 1
        : `0${months.indexOf(`${monthAndYear.slice(0, -5)}`) + 1}`;

    if (!e.target.classList.contains("inactive")) {
      sorted = true;
      const date = `${monthAndYear.slice(-4)}-${month}-${day}`;
      const movOneDay = movements
        .map((el) => (el.date === date ? el : 0))
        .filter((el) => el !== 0);
      displayItems(movOneDay);
    }
  });
