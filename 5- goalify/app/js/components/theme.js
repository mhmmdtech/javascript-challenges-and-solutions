const themeName = getTheme();
const themeTogglers = document.querySelectorAll('button[data-theme-toggler]');

setTheme(themeName);

if (themeTogglers.length > 0) {
  themeTogglers.forEach((themeToggler) => {
    themeToggler.addEventListener('click', switchTheme);
  });
}

function switchTheme(event) {
  const themeToggler = event.target;
  const themeName = themeToggler.dataset.themeToggler.toLowerCase();
  setTheme(themeName);
}

function setTheme(themeName) {
  setItemInLocalStorage('app-theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
}

function getThemeFromSystem() {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: light)');
  const systemTheme = darkThemeMq.matches ? 'light' : 'dark';
  return systemTheme;
}

function getTheme() {
  const localStorageTheme = getItemFromLocalStorage('app-theme');
  const systemTheme = getThemeFromSystem();
  let themeName = localStorageTheme ?? systemTheme;
  themeName = themeName.toLowerCase();
  switch (themeName) {
    case 'light':
      themeName = 'light';
      break;
    case 'dark':
      themeName = 'dark';
      break;
    default:
      themeName = systemTheme;
      break;
  }
  return themeName;
}
