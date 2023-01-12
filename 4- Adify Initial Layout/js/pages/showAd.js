let getCopyButtons = document.querySelectorAll('[data-get-copy]');
getCopyButtons.forEach((button) => {
  button.addEventListener('click', getCopyProcess);
});
function getCopyProcess(event) {
  new ClipboardCustom(event.target);
}
