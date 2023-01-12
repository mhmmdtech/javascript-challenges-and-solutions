class JobifyModal {
  constructor(modal) {
    this.initializeModal(modal);
  }
  initializeModal(modal) {
    this.modalName = modal.id;
    this.modalElement = modal;
    let modalActionElements = document.querySelectorAll(
      `[data-modal-action$="${this.modalName}"]`
    );
    let modalWrappers = modal.querySelectorAll('[data-modal-wrapper]');
    modalActionElements.forEach((modalActionElement) => {
      modalActionElement.addEventListener(
        'click',
        this.defineModalAction.bind(this, modalActionElement)
      );
    });
    modalWrappers.forEach((modalWrapper) => {
      modalWrapper.addEventListener('click', (event) => {
        // https://kotomi-noguchi.medium.com/javascript-preventing-parent-event-when-child-event-is-triggered-cfc3569f002f
        if (event && event.stopPropagation) event.stopPropagation();
      });
    });
  }
  defineModalAction(modalActionElement) {
    let modalActionName = modalActionElement.dataset.modalAction.split('|')[0];
    let modalActionMethod = `${modalActionName}Modal`;
    this[modalActionMethod](this.modalElement);
  }
  openModal(modal) {
    this.modalElement.classList.add('show');
  }
  closeModal(modal) {
    this.modalElement.classList.remove('show');
  }
}
