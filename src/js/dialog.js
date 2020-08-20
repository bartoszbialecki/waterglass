const DIALOG_SELECTOR = ".dialog";
const DIALOG_CLOSE_BUTTON_SELECTOR = ".dialog__close-button";
export const DIALOG_CONTENT_SELECTOR = ".dialog__content";
const DIALOG_OVERLAY_SELECTOR = ".dialog__overlay";
export const DIALOG_CLOSE_CLASS = "dialog__content--closed";
export const DIALOG_OPEN_CLASS = "dialog__content--open";

const closeDialogButtons = document.querySelectorAll(
  DIALOG_CLOSE_BUTTON_SELECTOR
);

closeDialogButtons.forEach((button) => {
  const dialog = button.closest(DIALOG_SELECTOR);

  button.addEventListener("click", () => {
    closeDialog(dialog);
  });
});

const closeDialog = (dialog) => {
  const dialogContent = dialog.querySelector(DIALOG_CONTENT_SELECTOR);
  dialogContent.classList.remove(DIALOG_OPEN_CLASS);
  dialogContent.classList.add(DIALOG_CLOSE_CLASS);

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
