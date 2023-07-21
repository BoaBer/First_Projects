"use strict";

const listContainer = document.getElementById("listContainer");
let thingsToDoInput = document.getElementById("thingsToDo");

let thingsToDo = [];

const loadThingsToDo = function () {
  thingsToDo = JSON.parse(localStorage.getItem("thingsToDo")) || [];
};

const displayThingsToDo = function () {
  const htmlStrings = thingsToDo
    .map(
      (id) => `
<li> 
 ${id}
 <button class="delete-btn" onclick="clearItem(event, '${id}')"> &times; </button>
</li>
`
    )
    .join("");
  listContainer.innerHTML = htmlStrings;
};

const saveThingToDo = function (e) {
  e.preventDefault();
  const thingToDo = thingsToDoInput.value;
  if (thingToDo !== "") {
    thingsToDo.unshift(thingToDo);
    thingsToDoInput.value = "";
    localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo));
    displayThingsToDo();
  }
};

loadThingsToDo();
displayThingsToDo();

const clearAll = function (e) {
  thingsToDo = [];
  localStorage.clear();
  displayThingsToDo();
};

const clearItem = function (e, key) {
  thingsToDo = thingsToDo.filter((i) => i !== key);
  localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo));
  displayThingsToDo();
};
