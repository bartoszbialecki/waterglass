const DIALOG_SELECTOR = ".dialog";
const DIALOG_CLOSE_BUTTON_SELECTOR = ".dialog__close-button";
const DIALOG_CONTENT_SELECTOR = ".dialog__content";
const DIALOG_OVERLAY_SELECTOR = ".dialog__overlay";
const DIALOG_CLOSE_CLASS = "dialog__content--closed";
const DIALOG_OPEN_CLASS = "dialog__content--open";

const closeDialogButtons = document.querySelectorAll(
  DIALOG_CLOSE_BUTTON_SELECTOR
);

closeDialogButtons.forEach((button) => {
  const dialog = button.closest(DIALOG_SELECTOR);

  button.addEventListener("click", () => {
    closeDialog(dialog);
  });
});

const toggleDialog = (dialog, isOpened) => {
  const dialogContent = dialog.querySelector(DIALOG_CONTENT_SELECTOR);
  dialogContent.classList.remove(
    isOpened ? DIALOG_OPEN_CLASS : DIALOG_CLOSE_CLASS
  );
  dialogContent.classList.add(
    isOpened ? DIALOG_CLOSE_CLASS : DIALOG_OPEN_CLASS
  );
};

const closeDialog = (dialog) => {
  toggleDialog(dialog, true);

  setTimeout(() => {
    dialog.style.display = "none";
  }, 500);
};

const dialogOverlays = document.querySelectorAll(DIALOG_OVERLAY_SELECTOR);

window.addEventListener("click", (e) => {
  const overlay = Array.from(dialogOverlays).find((node) => node == e.target);

  if (overlay !== undefined) {
    const dialog = overlay.closest(".dialog");
    closeDialog(dialog);
  }
});

export const openDialog = (dialog) => {
  dialog.style.display = "block";
  toggleDialog(dialog, false);
};
