class SidebarNavigation {
  constructor() {
    this.navigationStatus = false;
  }
  run(event) {
    this.parent = get_closest_element(event.target, '[data-sidebarNav]');
    this.sidebarNavigation = this.parent.querySelector(
      '[data-sidebarNav-menu]'
    );
    console.log(this.sidebarNavigation);
    if (!this.sidebarNavigation) {
      return;
    }
    this.navigationStatus === true
      ? this.closeSidebarNav(this.sidebarNavigation)
      : this.navigationStatus === false
      ? this.openSidebarNav(this.sidebarNavigation)
      : false;
  }
  openSidebarNav(modal) {
    modal.style.right = '0';
    this.navigationStatus = true;
  }
  closeSidebarNav(modal) {
    modal.style.right = '-100%';
    this.navigationStatus = false;
  }
}
let sidebarNavTogglers = document.querySelectorAll('[data-sidebarNav-toggler]');
const sidebarNavigation = new SidebarNavigation();

if (sidebarNavTogglers.length > 0) {
  sidebarNavTogglers.forEach((toggler) => {
    toggler.addEventListener(
      'click',
      sidebarNavigation.run.bind(sidebarNavigation)
    );
  });
}
