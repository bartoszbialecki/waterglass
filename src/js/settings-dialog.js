import { openDialog } from "./dialog";

const SETTINGS_DIALOG_SELECTOR = "#settings";
const OPEN_SETTINGS_DIALOG_SELECTOR = ".settings-button--js";

const openSettingsDialogButton = document.querySelector(
  OPEN_SETTINGS_DIALOG_SELECTOR
);
const settingsDialog = document.querySelector(SETTINGS_DIALOG_SELECTOR);

openSettingsDialogButton.addEventListener("click", () => {
  openDialog(settingsDialog);
});
