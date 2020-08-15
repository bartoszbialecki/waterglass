import "../scss/main.scss";

import { registerSW } from "./pwa.js";

registerSW();

const REMOVE_GLASS_BUTTON_SELECTOR = ".glass__remove-button--js";
const ADD_GLASS_BUTTON_SELECTOR = ".glass__add-button--js";
const GLASS_COUNTER_SELECTOR = ".glass__counter--js";

const removeGlassButton = document.querySelector(REMOVE_GLASS_BUTTON_SELECTOR);
const addGlassButton = document.querySelector(ADD_GLASS_BUTTON_SELECTOR);
const glassCounter = document.querySelector(GLASS_COUNTER_SELECTOR);

let numberOfGlasses = 0;

const updateGlassCounter = () => {
  glassCounter.innerHTML = numberOfGlasses;
};

const handleRemoveGlass = () => {
  if (numberOfGlasses > 0) {
    numberOfGlasses--;
    updateGlassCounter();
  }
};

const handleAddGlass = () => {
  numberOfGlasses++;
  updateGlassCounter();
};

removeGlassButton.addEventListener("click", handleRemoveGlass);
addGlassButton.addEventListener("click", handleAddGlass);
