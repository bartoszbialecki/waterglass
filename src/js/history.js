import {
  DIALOG_CONTENT_SELECTOR,
  DIALOG_OPEN_CLASS,
  DIALOG_CLOSE_CLASS,
} from "./dialog";

const OPEN_HISTORY_BUTTON_SELECTOR = ".history-button--js";
const HISTORY_DIALOG_SELECTOR = "#history";

const openHistoryButton = document.querySelector(OPEN_HISTORY_BUTTON_SELECTOR);
const historyDialog = document.querySelector(HISTORY_DIALOG_SELECTOR);

openHistoryButton.addEventListener("click", () => {
  historyDialog.style.display = "block";
  const dialogContent = historyDialog.querySelector(DIALOG_CONTENT_SELECTOR);
  dialogContent.classList.remove(DIALOG_CLOSE_CLASS);
  dialogContent.classList.add(DIALOG_OPEN_CLASS);
});
