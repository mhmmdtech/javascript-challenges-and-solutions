class ModalHandler {
  constructor() {
    this.modalStatus = false;
  }
  run(event) {
    this.parent = get_closest_element(event.target, '[data-modal]');
    this.modalMenu = this.parent.querySelector('[data-modal-menu]');
    if (!this.modalMenu) {
      return;
    }
    this.modalStatus === true
      ? this.closeModal(this.modalMenu)
      : this.modalStatus === false
      ? this.openModal(this.modalMenu)
      : false;
  }
  openModal(modal) {
    modal.style.display = 'block';
    this.modalStatus = true;
  }
  closeModal(modal) {
    modal.style.display = 'none';
    this.modalStatus = false;
  }
}

let modalTogglers = document.querySelectorAll('[data-modal-toggler]');
const Modal = new ModalHandler();

if (modalTogglers.length > 0) {
  modalTogglers.forEach((toggler) => {
    toggler.addEventListener('click', Modal.run.bind(Modal));
  });
}
