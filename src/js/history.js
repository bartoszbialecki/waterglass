import { openDialog } from "./dialog";

const OPEN_HISTORY_BUTTON_SELECTOR = ".history-button--js";
const HISTORY_DIALOG_SELECTOR = "#history";
const HISTORY_TABLE_SELECTOR = ".history-table--js";

const openHistoryButton = document.querySelector(OPEN_HISTORY_BUTTON_SELECTOR);
const historyDialog = document.querySelector(HISTORY_DIALOG_SELECTOR);
const historyTable = document.querySelector(HISTORY_TABLE_SELECTOR);
const historyTableBody = historyTable.querySelector("tbody");

openHistoryButton.addEventListener("click", () => {
  openDialog(historyDialog);
});

export const insertGlassInfoToTable = (date, numberOfGlasses) => {
  const row = historyTableBody.insertRow(0);
  const dateCell = row.insertCell(0);
  const glassesCell = row.insertCell(1);
  dateCell.innerHTML = date;
  glassesCell.innerHTML = numberOfGlasses;
};

export const updateGlassInfoInTable = (date, numberOfGlasses) => {
  const count = historyTableBody.rows.length;

  for (let i = 0; i < count; i++) {
    const row = historyTableBody.rows[i];

    if (row.cells[0].textContent === date) {
      row.cells[1].textContent = numberOfGlasses;
      break;
    }
  }
};

export const fillHistoryTable = (db) => {
  db.forEach((item) => insertGlassInfoToTable(item.date, item.glasses));
};
