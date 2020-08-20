import { openDialog } from "./dialog";

const OPEN_HISTORY_BUTTON_SELECTOR = ".history-button--js";
const HISTORY_DIALOG_SELECTOR = "#history";

const openHistoryButton = document.querySelector(OPEN_HISTORY_BUTTON_SELECTOR);
const historyDialog = document.querySelector(HISTORY_DIALOG_SELECTOR);

openHistoryButton.addEventListener("click", () => {
  openDialog(historyDialog);
});
