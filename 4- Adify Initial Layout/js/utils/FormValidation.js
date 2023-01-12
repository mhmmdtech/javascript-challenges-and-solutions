class FormValidation {
    constructor(form, details) {
        this.form = form;
        this.details = details;
        this.errors = {};
        this.rules = [
            "required",
            "minLength",
            "maxLength",
            "pattern",
            "confirm",
        ];
        this.runValidation = this.runValidation.bind(this);
        this.requiredValidation = this.requiredValidation.bind(this);
        this.minLengthValidation = this.minLengthValidation.bind(this);
        this.maxLengthValidation = this.maxLengthValidation.bind(this);
        this.patternValidation = this.patternValidation.bind(this);
        this.confirmValidation = this.confirmValidation.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.hideErrors = this.hideErrors.bind(this);
        this.formHasError = this.formHasError.bind(this);
        this.form.addEventListener("submit", this.runValidation);
    }
    runValidation(event) {
        event.preventDefault();
        this.form.querySelector("button[type='submit']").disabled = true;
        let errorsCount = Object.keys(this.errors).length;
        let isInitialErrors = true;
        if (errorsCount > 0) {
            this.hideErrors(this.errors);
            this.errors = {};
            isInitialErrors = false;
        }
        for (const [key, value] of Object.entries(this.details)) {
            let currentInput = key;
            for (const [ruleKey, ruleValue] of Object.entries(value)) {
                if (this.rules.includes(ruleKey)) {
                    let validate = this[`${ruleKey}Validation`](
                        currentInput,
                        ruleValue
                    );
                    let hasError = validate && validate.result;
                    if (hasError && !this.errors[currentInput]) {
                        this.errors[currentInput] = validate.message;
                    }
                }
            }
        }
        errorsCount = Object.keys(this.errors).length;
        if (errorsCount > 0) {
            if (isInitialErrors) {
                this.showErrors(this.errors);
                this.form.querySelector(
                    "button[type='submit']"
                ).disabled = false;
            } else {
                setTimeout(() => {
                    this.showErrors(this.errors);
                    this.form.querySelector(
                        "button[type='submit']"
                    ).disabled = false;
                }, 500);
            }
        }
        this.formHasError();
    }
    showErrors(errors) {
        for (const [key, value] of Object.entries(errors)) {
            let input = this.form.querySelector(`[name=${key}]`);
            let inputGroup = get_closest_element(input, "[data-input-group]");
            let errorWrapper = inputGroup.querySelector("[data-input-error]");
            let errorSpan = document.createElement("span");
            errorSpan.textContent = value;
            errorWrapper.appendChild(errorSpan);
            errorWrapper.classList.add("show");
        }
    }
    hideErrors(errors) {
        for (const [key, value] of Object.entries(errors)) {
            let input = this.form.querySelector(`[name=${key}]`);
            let inputGroup = get_closest_element(input, "[data-input-group]");
            let errorWrapper = inputGroup.querySelector("[data-input-error]");
            errorWrapper.classList.remove("show");
            setTimeout(() => {
                // https://dirask.com/posts/JavaScript-no-break-non-breaking-space-in-string-jMwzxD
                // errorWrapper.querySelector('span').textContent = '';
                let child = errorWrapper.lastElementChild;
                while (child) {
                    errorWrapper.removeChild(child);
                    child = errorWrapper.lastElementChild;
                }
            }, 250);
        }
    }
    formHasError() {
        let hasError = Object.keys(this.errors).length > 0 ? true : false;
        return hasError;
    }
    requiredValidation(name, value) {
        let input = this.form.querySelector(`[name=${name}]`);
        let errorName = input.dataset.errorName;
        let result = null;
        if (value === true) {
            result =
                input.value.trim() === "" || input.value.trim().length === 0;
            return { result, message: `${errorName} الزامی است` };
        }
        return;
    }
    minLengthValidation(name, value) {
        let input = this.form.querySelector(`[name=${name}]`);
        let errorName = input.dataset.errorName;
        let result = null;
        result = input.value.trim().length < value;
        return {
            result,
            message: `${errorName} باید بیش‌تر از ${value} کاراکتر باشد`,
        };
    }
    maxLengthValidation(name, value) {
        let input = this.form.querySelector(`[name=${name}]`);
        let errorName = input.dataset.errorName;
        let result = null;
        result = input.value.trim().length > value;
        return {
            result,
            message: `${errorName} باید کم‌تر از ${value} کاراکتر باشد`,
        };
    }
    patternValidation(name, pattern) {
        let input = this.form.querySelector(`[name=${name}]`);
        let errorName = input.dataset.errorName;
        let result = null;
        result = !pattern.test(input.value);
        if (result) {
            return { result, message: `${errorName} نامعتبر است` };
        }
        return;
    }
    confirmValidation(name, value) {
        let input = this.form.querySelector(`[name=${name}]`);
        let confirm_input = this.form.querySelector(`[name='confirm_${name}']`);
        let errorName = input.dataset.errorName;
        let result = null;
        if (value === true) {
            result = input.value !== confirm_input.value;
            return { result, message: `${errorName} یکسان نیست` };
        }
        return;
    }
}
