import "../scss/main.scss";

import { registerSW } from "./pwa.js";

registerSW();

const INFO_GOAL_SELECTOR = ".app__goal";
const REMOVE_GLASS_BUTTON_SELECTOR = ".glass__remove-button--js";
const ADD_GLASS_BUTTON_SELECTOR = ".glass__add-button--js";
const GLASS_COUNTER_SELECTOR = ".glass__counter--js";
const GLASS_COUNTER_ANIMATION_CLASS = "glass__counter--animated";
const GLASS_COUNTER_DARK_CLASS = "glass__counter--dark";
const GLASS_WATER_SELECTOR = ".glass__water--js";
const GLASS_WATER_ANIMATION_CLASS = "glass__water--animated";

const infoGoal = document.querySelector(INFO_GOAL_SELECTOR);
const removeGlassButton = document.querySelector(REMOVE_GLASS_BUTTON_SELECTOR);
const addGlassButton = document.querySelector(ADD_GLASS_BUTTON_SELECTOR);
const glassCounter = document.querySelector(GLASS_COUNTER_SELECTOR);
const glassWater = document.querySelector(GLASS_WATER_SELECTOR);

const storageKey = new Date().toISOString().slice(0, 10);

let goal = 1.5; // in litres
let glassCapacity = 0.25; // in litres
let goalInGlasses = goal / glassCapacity;

let numberOfGlasses = localStorage.getItem(storageKey) || 0;

const updateGlassCounter = () => {
  const waterStartScaleXVariable = "--waterStartScaleX";
  const waterEndScaleXVariable = "--waterEndScaleX";
  const waterStartScaleYVariable = "--waterStartScaleY";
  const waterEndScaleYVariable = "--waterEndScaleY";

  const counterIncreasing =
    parseInt(glassCounter.innerHTML, 10) < numberOfGlasses;

  glassCounter.innerHTML = numberOfGlasses;

  glassCounter.classList.remove(GLASS_COUNTER_DARK_CLASS);
  glassCounter.classList.remove(GLASS_COUNTER_ANIMATION_CLASS);
  glassWater.classList.remove(GLASS_WATER_ANIMATION_CLASS);
  // trigger reflow (without it, the animation won't work)
  void glassCounter.offsetWidth;
  glassCounter.classList.add(GLASS_COUNTER_ANIMATION_CLASS);

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
  localStorage.setItem(storageKey, numberOfGlasses);
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
  infoGoal.innerHTML = `${goalInGlasses}`;
};

updateInfoGoal();

removeGlassButton.addEventListener("click", handleRemoveGlass);
addGlassButton.addEventListener("click", handleAddGlass);

updateGlassCounter();
