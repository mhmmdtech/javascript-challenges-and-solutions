const modals = document.querySelectorAll('[data-modal]');
if (modals && modals.length > 0) {
  modals.forEach((modal) => {
    new JobifyModal(modal);
  });
}
