import "../scss/main.scss";

import { registerSW } from "./pwa.js";

registerSW();

const REMOVE_GLASS_BUTTON_SELECTOR = ".glass__remove-button--js";
const ADD_GLASS_BUTTON_SELECTOR = ".glass__add-button--js";
const GLASS_COUNTER_SELECTOR = ".glass__counter--js";
const GLASS_COUNTER_ANIMATION_CLASS = "glass__counter--animated";

const removeGlassButton = document.querySelector(REMOVE_GLASS_BUTTON_SELECTOR);
const addGlassButton = document.querySelector(ADD_GLASS_BUTTON_SELECTOR);
const glassCounter = document.querySelector(GLASS_COUNTER_SELECTOR);

const storageKey = new Date().toISOString().slice(0, 10);

let numberOfGlasses = localStorage.getItem(storageKey) || 0;

const updateGlassCounter = () => {
  glassCounter.innerHTML = numberOfGlasses;
  glassCounter.classList.remove(GLASS_COUNTER_ANIMATION_CLASS);

  // trigger reflow (without it, the animation won't work)
  void glassCounter.offsetWidth;

  glassCounter.classList.add(GLASS_COUNTER_ANIMATION_CLASS);
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

removeGlassButton.addEventListener("click", handleRemoveGlass);
addGlassButton.addEventListener("click", handleAddGlass);

updateGlassCounter();
