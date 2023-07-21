"use strict";

const tableContainer = document.getElementById("table-container");

let expenses = [];

const loadExpenses = function () {
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
};

const displayExpenses = function () {
  let htmlString = "";
  for (let i = 0; i < expenses.length; i++) {
    htmlString += `
    <tr>
      <td>${expenses[i].type}</td>
      <td>${expenses[i].name}</td>
      <td>${expenses[i].date}</td>
      <td>${expenses[i].amount}</td>
      <td><button class="btn" id="btn-${expenses[i].id}" onclick="deleteExpense(${expenses[i].id})">&times;</button></td>
    </tr>
    `;
  }
  tableContainer.innerHTML = htmlString;
};

loadExpenses();
displayExpenses();

const saveExpense = function (e) {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const amount = document.getElementById("amount").value;

  if (type !== "" && name !== "" && date !== "" && amount !== "") {
    const expense = {
      type,
      name,
      date,
      amount,
      id: expenses.length > 0 ? expenses.length + 1 : 1,
    };
    expenses.unshift(expense);
    document.getElementById("form-c").reset();
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
  }
};

const deleteExpense = function (id) {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      expenses.splice(i, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      displayExpenses();
    }
  }
};
