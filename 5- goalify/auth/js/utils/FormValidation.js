class FormValidation {
  constructor(form, details) {
    this.form = form;
    this.details = details;
    this.isInitialErrors = true;
    this.errors = {};
    this.rules = ['required', 'minLength', 'maxLength', 'pattern', 'confirm'];
    this.form.addEventListener('submit', this.runValidation.bind(this));
  }
  runValidation(event) {
    event.preventDefault();
    this.form.querySelector("button[type='submit']").disabled = true;
    this.hideErrors();
    for (const [key, value] of Object.entries(this.details)) {
      let currentInput = key;
      for (const [ruleKey, ruleValue] of Object.entries(value)) {
        if (this.rules.includes(ruleKey)) {
          let validate = this[`${ruleKey}Validation`](currentInput, ruleValue);
          let hasError = validate?.result;
          if (hasError && !this.errors[currentInput]) {
            this.errors[currentInput] = validate.message;
          }
        }
      }
    }
    this.showErrors();
  }
  hideErrors() {
    let errorsCount = Object.keys(this.errors).length;
    if (errorsCount > 0) {
      this.hideErrorsOnUI(this.errors);
      this.errors = {};
      this.isInitialErrors = false;
    }
  }
  hideErrorsOnUI(errors) {
    for (const key of Object.keys(errors)) {
      let input = this.form.querySelector(`[name=${key}]`);
      let inputGroup = get_closest_element(input, '[data-input-group]');
      let errorWrapper = inputGroup.querySelector('[data-input-error]');
      errorWrapper.classList.replace('show', 'hide');
      setTimeout(() => {
        // https://dirask.com/posts/JavaScript-no-break-non-breaking-space-in-string-jMwzxD
        errorWrapper.querySelector('span').textContent = '\u00A0';
      }, 250);
    }
  }
  showErrors() {
    let errorsCount = Object.keys(this.errors).length;
    if (errorsCount > 0) {
      if (this.isInitialErrors) {
        this.showErrorsOnUI(this.errors);
        this.form.querySelector("button[type='submit']").disabled = false;
      } else {
        setTimeout(() => {
          this.showErrorsOnUI(this.errors);
          this.form.querySelector("button[type='submit']").disabled = false;
        }, 500);
      }
    }
  }
  showErrorsOnUI(errors) {
    for (const [key, value] of Object.entries(errors)) {
      let input = this.form.querySelector(`[name=${key}]`);
      let inputGroup = get_closest_element(input, '[data-input-group]');
      let errorWrapper = inputGroup.querySelector('[data-input-error]');
      errorWrapper.querySelector('span').textContent = value;
      errorWrapper.classList.replace('hide', 'show');
    }
  }
  doesFormHaveError() {
    let hasError = Object.keys(this.errors).length > 0 ? true : false;
    return hasError;
  }
  requiredValidation(name, value) {
    let input = this.form.querySelector(`[name=${name}]`);
    let result = null;
    if (value === true) {
      result = input.value.trim() === '' || input.value.trim().length === 0;
      return { result, message: `${name} is required` };
    }
    return;
  }
  minLengthValidation(name, value) {
    let input = this.form.querySelector(`[name=${name}]`);
    let result = null;
    result = input.value.trim().length < value;
    return { result, message: `${name} must be at least ${value} characters` };
  }
  maxLengthValidation(name, value) {
    let input = this.form.querySelector(`[name=${name}]`);
    let result = null;
    result = input.value.trim().length > value;
    return { result, message: `${name} must be at most ${value} characters` };
  }
  patternValidation(name, pattern) {
    let input = this.form.querySelector(`[name=${name}]`);
    let result = null;
    result = !pattern.test(input.value);
    if (result) {
      return { result, message: `${name} is invalid` };
    }
    return;
  }
  confirmValidation(name, value) {
    let input = this.form.querySelector(`[name=${name}]`);
    let confirm_input = this.form.querySelector(`[name='confirm_${name}']`);
    let result = null;
    if (value === true) {
      result = input.value !== confirm_input.value;
      return { result, message: `${name} does not match` };
    }
    return;
  }
}
