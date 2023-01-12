const formValidationDetails = {
  title: {
    required: true,
    minLength: 4,
    maxLength: 50,
    pattern: /^[A-Za-z0-9\_]{4,50}$/i,
  },
  start_date: {
    required: true,
    pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
  },
  end_date: {
    required: true,
    pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
  },
  summary: {
    required: true,
  },
};
const createGoalForm = document.querySelector('#edit-goal-form');
const FormValidator = new FormValidation(createGoalForm, formValidationDetails);
createGoalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!FormValidator.formHasError()) {
    console.log('time to send Ajax request');
  }
});
