import "../scss/main.scss";

import { registerSW } from "./pwa.js";
import {
  fillHistoryTable,
  insertGlassInfoToTable,
  updateGlassInfoInTable,
  drawHistoryGraph,
} from "./history";

registerSW();

const INFO_GOAL_SELECTOR = ".app__goal";
const GOAL_ACHIEVED_SELECTOR = ".app__goal--achieved";
const GOAL_ACHIEVED_ANIMATION_CLASS = "app__goal--achieved--animated";
const REMOVE_GLASS_BUTTON_SELECTOR = ".glass__remove-button--js";
const ADD_GLASS_BUTTON_SELECTOR = ".glass__add-button--js";
const GLASS_COUNTER_SELECTOR = ".glass__counter--js";
const GLASS_COUNTER_ANIMATION_CLASS = "glass__counter--animated";
const GLASS_COUNTER_DARK_CLASS = "glass__counter--dark";
const GLASS_WATER_SELECTOR = ".glass__water--js";
const GLASS_WATER_ANIMATION_CLASS = "glass__water--animated";
const GLASS_CAPACITY_INFO_SELECTOR = ".glass__capacity--js";
const SETTINGS_GLASS_CAPACITY_SELECTOR = ".glass-capacity--js";
const SETTINGS_GOAL_SELECTOR = ".select-goal--js";

const DB_STORAGE_KEY = "glassesDB";
const GLASS_CAPACITY_STORAGE_KEY = "glassCapacity";
const GOAL_STORAGE_KEY = "goal";

const infoGoal = document.querySelector(INFO_GOAL_SELECTOR);
const goalAchieved = document.querySelector(GOAL_ACHIEVED_SELECTOR);
const removeGlassButton = document.querySelector(REMOVE_GLASS_BUTTON_SELECTOR);
const addGlassButton = document.querySelector(ADD_GLASS_BUTTON_SELECTOR);
const glassCounter = document.querySelector(GLASS_COUNTER_SELECTOR);
const glassWater = document.querySelector(GLASS_WATER_SELECTOR);
const glassCapacityInfo = document.querySelector(GLASS_CAPACITY_INFO_SELECTOR);
const glassCapacitySelect = document.querySelector(
  SETTINGS_GLASS_CAPACITY_SELECTOR
);
const goalSelect = document.querySelector(SETTINGS_GOAL_SELECTOR);

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

const currentDate = getCurrentDate();

const findIndexOfPresentGlassesInDB = () => {
  return db.findIndex((item) => item.date === currentDate);
};

const readDataFromStorage = () => {
  let goal = parseFloat(localStorage.getItem(GOAL_STORAGE_KEY)) || 1.5; // in litres
  let glassCapacity =
    parseFloat(localStorage.getItem(GLASS_CAPACITY_STORAGE_KEY)) || 0.25; // in litres
  let goalInGlasses = parseFloat(goal / glassCapacity);

  return [goal, glassCapacity, goalInGlasses];
};

let db = JSON.parse(localStorage.getItem(DB_STORAGE_KEY)) || [];
db.sort((a, b) => new Date(a.date) - new Date(b.date));

let [goal, glassCapacity, goalInGlasses] = readDataFromStorage();

let numberOfGlasses = 0;

const index = findIndexOfPresentGlassesInDB();

if (index > -1) {
  numberOfGlasses = db[index].glasses;
}

const selectGlassCapacity = () => {
  const capacityOption = glassCapacitySelect.querySelector(
    "[value='" + glassCapacity + "'"
  );

  if (capacityOption) {
    capacityOption.selected = true;
  }
};

const fillGoalSelect = () => {
  const maxGoal = 5;
  const standardGlassCapacity = 0.25;
  let count = 1;
  let capacity = 0;

  do {
    capacity = count * standardGlassCapacity;
    let option = document.createElement("option");
    option.value = capacity;
    option.text = `${capacity} l`;
    goalSelect.add(option);
    count++;
  } while (capacity < maxGoal);
};

const selectGoal = () => {
  const goalOption = goalSelect.querySelector("[value='" + goal + "'");

  if (goalOption) {
    goalOption.selected = true;
  }
};

const setupSettingsDialog = () => {
  selectGlassCapacity();
  fillGoalSelect();
  selectGoal();
};

const updateGlassCounter = () => {
  const waterStartScaleXVariable = "--waterStartScaleX";
  const waterEndScaleXVariable = "--waterEndScaleX";
  const waterStartScaleYVariable = "--waterStartScaleY";
  const waterEndScaleYVariable = "--waterEndScaleY";

  const counterIncreasing =
    parseInt(glassCounter.innerHTML, 10) < numberOfGlasses;

  glassCounter.innerHTML = numberOfGlasses;

  goalAchieved.classList.remove(GOAL_ACHIEVED_ANIMATION_CLASS);
  glassCounter.classList.remove(GLASS_COUNTER_DARK_CLASS);
  glassCounter.classList.remove(GLASS_COUNTER_ANIMATION_CLASS);
  glassWater.classList.remove(GLASS_WATER_ANIMATION_CLASS);
  // trigger reflow (without it, the animation won't work)
  void glassCounter.offsetWidth;
  glassCounter.classList.add(GLASS_COUNTER_ANIMATION_CLASS);

  if (numberOfGlasses >= goalInGlasses) {
    goalAchieved.classList.add(GOAL_ACHIEVED_ANIMATION_CLASS);
  }

  const glassesInPercent = numberOfGlasses / goalInGlasses;

  if (glassesInPercent < 0.6) {
    glassWater.style.setProperty(waterStartScaleXVariable, "0.8");
    glassWater.style.setProperty(waterEndScaleXVariable, "0.8");
  } else if (glassesInPercent < 0.7) {
    glassWater.style.setProperty(
      waterStartScaleXVariable,
      counterIncreasing ? "0.8" : "0.9"
    );
    glassWater.style.setProperty(
      waterEndScaleXVariable,
      counterIncreasing ? "0.9" : "0.8"
    );
  } else if (glassesInPercent < 0.9) {
    glassWater.style.setProperty(
      waterStartScaleXVariable,
      counterIncreasing ? "0.9" : "1"
    );
    glassWater.style.setProperty(
      waterEndScaleXVariable,
      counterIncreasing ? "1" : "0.9"
    );
  } else {
    glassWater.style.setProperty(waterStartScaleXVariable, "1");
    glassWater.style.setProperty(waterEndScaleXVariable, "1");
  }

  const lastEndScaleY =
    parseFloat(
      getComputedStyle(glassWater).getPropertyValue(waterEndScaleYVariable)
    ) || 0;

  let endScaleY = glassesInPercent;

  if (endScaleY > 1) {
    endScaleY = 1;
  }

  if (lastEndScaleY === endScaleY && lastEndScaleY === 1) {
    glassWater.style.setProperty(waterStartScaleYVariable, "0");
    glassWater.style.setProperty(waterEndScaleYVariable, "1");
  } else {
    glassWater.style.setProperty(waterStartScaleYVariable, `${lastEndScaleY}`);
    glassWater.style.setProperty(waterEndScaleYVariable, `${endScaleY}`);
  }

  if (endScaleY < 0.75) {
    glassCounter.classList.add(GLASS_COUNTER_DARK_CLASS);
  }

  glassWater.classList.add(GLASS_WATER_ANIMATION_CLASS);
};

const updateSotrage = () => {
  const index = findIndexOfPresentGlassesInDB();

  if (index === -1) {
    db.unshift({
      date: currentDate,
      glasses: numberOfGlasses,
    });

    insertGlassInfoToTable(currentDate, numberOfGlasses);
  } else {
    db[index].glasses = numberOfGlasses;
    updateGlassInfoInTable(currentDate, numberOfGlasses);
  }

  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
};

const handleRemoveGlass = () => {
  if (numberOfGlasses > 0) {
    numberOfGlasses--;
    updateGlassCounter();
    updateSotrage();
  }
};

const handleAddGlass = () => {
  numberOfGlasses++;
  updateGlassCounter();
  updateSotrage();
};

const updateInfoGoal = () => {
  infoGoal.innerHTML = `${parseFloat(goalInGlasses.toFixed(2)).toString()}`;
};

const updateGlassCapacityInfo = () => {
  glassCapacityInfo.innerHTML = `${glassCapacity * 1000} ml`;
};

const handleChangeGlassCapacity = () => {
  const selectedValue =
    glassCapacitySelect.options[glassCapacitySelect.selectedIndex].value;
  localStorage.setItem(GLASS_CAPACITY_STORAGE_KEY, selectedValue);

  [goal, glassCapacity, goalInGlasses, numberOfGlasses] = readDataFromStorage();

  updateGlassCapacityInfo();
  updateInfoGoal();
};

const handleChangeGoal = () => {
  const selectedValue = goalSelect.options[goalSelect.selectedIndex].value;
  localStorage.setItem(GOAL_STORAGE_KEY, selectedValue);

  [goal, glassCapacity, goalInGlasses, numberOfGlasses] = readDataFromStorage();

  updateInfoGoal();
  goalAchieved.classList.remove(GOAL_ACHIEVED_ANIMATION_CLASS);
};

setupSettingsDialog();
updateInfoGoal();
updateGlassCapacityInfo();
updateGlassCounter();

removeGlassButton.addEventListener("click", handleRemoveGlass);
addGlassButton.addEventListener("click", handleAddGlass);

glassCapacitySelect.addEventListener("change", handleChangeGlassCapacity);
goalSelect.addEventListener("change", handleChangeGoal);

fillHistoryTable(db);
drawHistoryGraph(db);
