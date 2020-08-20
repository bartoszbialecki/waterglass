import {
  DIALOG_CONTENT_SELECTOR,
  DIALOG_OPEN_CLASS,
  DIALOG_CLOSE_CLASS,
} from "./dialog";

const SETTINGS_DIALOG_SELECTOR = "#settings";
const OPEN_SETTINGS_DIALOG_SELECTOR = ".settings-button--js";

const openSettingsDialogButton = document.querySelector(
  OPEN_SETTINGS_DIALOG_SELECTOR
);
const settingsDialog = document.querySelector(SETTINGS_DIALOG_SELECTOR);

openSettingsDialogButton.addEventListener("click", () => {
  settingsDialog.style.display = "block";
  const dialogContent = settingsDialog.querySelector(DIALOG_CONTENT_SELECTOR);
  dialogContent.classList.remove(DIALOG_CLOSE_CLASS);
  dialogContent.classList.add(DIALOG_OPEN_CLASS);
});
