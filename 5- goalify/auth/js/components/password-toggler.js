// https://airbnb.io/lottie/#/web
const passwordTogglers = document.querySelectorAll(
  '.auth-form__password-toggler'
);

passwordTogglers.forEach((passwordToggler) => {
  let passwordTogglerAnimation = lottie.loadAnimation({
    container: passwordToggler,
    path: '../../assets/icons/animated/password-toggler.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: 'password Toggler',
  });

  passwordTogglerAnimation.goToAndStop(17, true);

  passwordToggler.addEventListener(
    'click',
    togglePassword.bind(null, passwordTogglerAnimation)
  );
});
function togglePassword(animation, event) {
  let parent = get_closest_element(event.target, '[data-password-toggler]');
  let input = get_sibling(parent, '.auth-form__input');

  if (input.type === 'password') {
    input.type = 'text';
    animation.playSegments([17, 0], true);
  } else if (input.type === 'text') {
    input.type = 'password';
    animation.playSegments([0, 18], true);
  }
}
