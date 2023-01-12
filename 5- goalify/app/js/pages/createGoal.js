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
const editGoalForm = document.querySelector('#create-goal-form');
const FormValidator = new FormValidation(editGoalForm, formValidationDetails);
editGoalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!FormValidator.formHasError()) {
    console.log('time to send Ajax request');
  }
});
autosize(document.querySelectorAll('.growing-height-textarea-js'));
flatpickr(document.querySelector('#started_at'), {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  minDate: subtractMonths(1),
  maxDate: addMonths(3),
});
flatpickr(document.querySelector('#ended_at'), {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  minDate: addDays(7),
  maxDate: addMonths(60),
});
