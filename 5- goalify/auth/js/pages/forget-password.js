const formValidationDetails = {
  email: {
    required: true,
    minLength: 5,
    maxLength: 65,
    pattern:
      /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/i,
  },
};
const forgetForm = document.querySelector('#forget-password-form');
const FormValidator = new FormValidation(forgetForm, formValidationDetails);
forgetForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!FormValidator.doesFormHaveError()) {
    console.log('time to send Ajax request');
  }
});
// if (FormValidator.formHasError()) {
//   console.log('we have some Error');
// }
// username: /^\w+$/gm
// https://www.regular-expressions.info/email.html
// email: /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/gm
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a#:~:text=company%20blog-,Regex%20for%20password%20must%20contain%20at%20least%20eight%20characters%2C%20at,uppercase%20letters%20and%20special%20characters
// password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm
