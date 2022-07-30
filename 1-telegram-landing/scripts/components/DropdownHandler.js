// let onDdBodyClick, currentDd;
// function dropdownClick(dropdown, event) {
//   var isOpen = (dropdown.className || '').indexOf('open') > 0;
//   if (currentDd && currentDd != dropdown) {
//     dropdownHide(currentDd);
//   }

//   if (!isOpen) {
//     dropdown.className = (dropdown.className || '') + ' open';
//     if (!onDdBodyClick) {
//       window.addEventListener('click', dropdownPageClick, false);
//     }
//     currentDd = dropdown;
//   } else {
//     dropdownHide(currentDd);
//     currentDd = false;
//   }
//   event.cancelBubble = true;
//   return false;
// }
// function dropdownHide(dropdown) {
//   dropdown.className = dropdown.className.replace(' open', '');
// }
// function dropdownPageClick() {
//   if (currentDd) {
//     dropdownHide(currentDd);
//     currentDd = false;
//   }
// }
class DropdownHandler {
  constructor() {
    this.currentDd = false;
    this.onDdBodyClick = false;
  }
  run(event) {
    this.parent = get_closest_element(event.target, '[data-dropdown]');
    this.dropdownMenu = this.parent.querySelector('[data-dropdown-menu]');
    if (!this.dropdownMenu) {
      return;
    }
    this.dropdownClick(this.dropdownMenu, event);
  }
  dropdownClick(dropdown, event) {
    let isOpen = dropdown.classList.contains('open');
    if (this.currentDd && this.currentDd != dropdown) {
      this.dropdownHide(this.currentDd);
    }

    if (!isOpen) {
      dropdown.classList.add('open');
      if (!this.onDdBodyClick) {
        window.addEventListener(
          'click',
          this.dropdownPageClick.bind(this),
          false
        );
      }
      this.currentDd = dropdown;
    } else {
      this.dropdownHide(this.currentDd);
      this.currentDd = false;
    }
    event.cancelBubble = true;
    return false;
  }
  dropdownHide(dropdown) {
    dropdown.classList.remove('open');
  }
  dropdownPageClick() {
    if (this.currentDd) {
      this.dropdownHide(this.currentDd);
      this.currentDd = false;
    }
  }
}

let DropdownTogglers = document.querySelectorAll('[data-dropdown-toggler]');
const DropDown = new DropdownHandler();

if (DropdownTogglers.length > 0) {
  DropdownTogglers.forEach((toggler) => {
    toggler.addEventListener('click', dropdownClickEventHandler);
  });
}

function dropdownClickEventHandler(event) {
  DropDown.run(event);
}
