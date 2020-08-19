const DIALOG_CLOSE_BUTTON_SELECTOR = ".dialog__close-button";
const DIALOG_SELECTOR = ".dialog";
const DIALOG_CONTENT_SELECTOR = ".dialog__content";
const OPEN_SETTINGS_DIALOG_SELECTOR = ".header__settings-button";
const DIALOG_OVERLAY_SELECTOR = ".dialog__overlay";

const openSettingsDialogButton = document.querySelector(
  OPEN_SETTINGS_DIALOG_SELECTOR
);
const closeDialogButton = document.querySelector(DIALOG_CLOSE_BUTTON_SELECTOR);
const dialog = document.querySelector(DIALOG_SELECTOR);
const dialogContent = document.querySelector(DIALOG_CONTENT_SELECTOR);

const closeDialog = () => {
  dialogContent.style.cssText = "animation: slide-out .5s ease forwards;";

  setTimeout(() => {
    dialog.style.display = "none";
  }, 500);
};

openSettingsDialogButton.addEventListener("click", () => {
  dialog.style.display = "block";
  dialogContent.style.cssText = "animation: slide-in .5s ease forwards";
});

closeDialogButton.addEventListener("click", () => {
  closeDialog();
});

window.addEventListener("click", (e) => {
  if (e.target == document.querySelector(DIALOG_OVERLAY_SELECTOR)) {
    closeDialog();
  }
});
