const DIALOG_CLOSE_BUTTON_SELECTOR = ".dialog__close-button";
const DIALOG_SELECTOR = ".dialog";
const DIALOG_CONTENT_SELECTOR = ".dialog__content";
const OPEN_SETTINGS_DIALOG_SELECTOR = ".header__settings-button";
const DIALOG_OVERLAY_SELECTOR = ".dialog__overlay";
const DIALOG_CLOSE_CLASS = "dialog__content--closed";
const DIALOG_OPEN_CLASS = "dialog__content--open";

const openSettingsDialogButton = document.querySelector(
  OPEN_SETTINGS_DIALOG_SELECTOR
);
const closeDialogButton = document.querySelector(DIALOG_CLOSE_BUTTON_SELECTOR);
const dialog = document.querySelector(DIALOG_SELECTOR);
const dialogContent = document.querySelector(DIALOG_CONTENT_SELECTOR);

const closeDialog = () => {
  dialogContent.classList.remove(DIALOG_OPEN_CLASS);
  dialogContent.classList.add(DIALOG_CLOSE_CLASS);

  setTimeout(() => {
    dialog.style.display = "none";
  }, 500);
};

openSettingsDialogButton.addEventListener("click", () => {
  dialog.style.display = "block";
  dialogContent.classList.remove(DIALOG_CLOSE_CLASS);
  dialogContent.classList.add(DIALOG_OPEN_CLASS);
});

closeDialogButton.addEventListener("click", () => {
  closeDialog();
});

window.addEventListener("click", (e) => {
  if (e.target == document.querySelector(DIALOG_OVERLAY_SELECTOR)) {
    closeDialog();
  }
});
