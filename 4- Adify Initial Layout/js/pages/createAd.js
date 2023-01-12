let default_requirements = $('#requirements').val();
let default_data__requirements = null;
if ($('#requirements').val() !== null && $('#requirements').val().length > 0) {
  default_data__requirements = default_requirements.split(',');
}

// ---------------------------------------------------------------------
// ------------------------- Create Job Ads ----------------------------
// ---------------------------------------------------------------------
const formValidationDetails = {
  company_id: {
    required: true,
  },
  job_id: {
    required: true,
  },
  salary: {
    required: true,
  },
  seniority: {
    required: true,
  },
  work_type: {
    required: true,
  },
  ad_url: {
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  requirements: {
    // required: true,
    // minLength: 5,
    // maxLength: 255,
  },
  explanation: {
    maxLength: 255,
  },
};
const editAdForm = document.querySelector('#edit-ad-form');
const FormValidator = new FormValidation(editAdForm, formValidationDetails);
editAdForm.addEventListener('submit', (event) => {
  if (!FormValidator.formHasError()) {
    // get requirements
    if (
      $('#requirements__tags').val() !== null &&
      $('#requirements__tags').val().length > 0
    ) {
      let selectedSource = $('#requirements__tags').val().join(',');
      $('#requirements').val(selectedSource);
    }
    // https://gomakethings.com/serializing-form-data-with-the-vanilla-js-formdata-object
    // https://www.learnwithjason.dev/blog/get-form-values-as-json
    // https://www.javascripttutorial.net/web-apis/javascript-formdata/
    const formData = Object.fromEntries(new FormData(editAdForm));
    const http = new EasyHTTP();
    const apiFormAction = editAdForm.dataset.secondaryAction;
    http
      .post(apiFormAction, formData)
      .then((data) => {
        if (data.status === true) {
          console.log(data);
          window.location.href = data.redirectTo;
        } else if (data.status === false) {
          console.log(data);
          FormValidator.form.querySelector(
            "button[type='submit']"
          ).disabled = false;
        }
      })
      .catch((err) => console.warn(err));
  }
});
// ---------------------------------------------------------------------
// --------------------- Make Textarea Height Dynamic ------------------
// ---------------------------------------------------------------------
autosize(document.querySelectorAll('.growing-height-textarea-js'));
// ---------------------------------------------------------------------
// ------------------- Handle AutoComplete For Company name ------------
// ---------------------------------------------------------------------
$('#company_id').select2({
  placeholder: 'دیجی‌کالا',
  dir: 'rtl',
  language: 'fa',
  minimumInputLength: 3,
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
  ajax: {
    url: '/api/get-companies',
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: $.trim(params.term),
      };
    },
    processResults: function (data) {
      return {
        results: $.map(data, function (item) {
          return {
            id: item.id,
            company_name: item.company_name,
          };
        }),
      };
    },
    cache: true,
  },

  templateResult: formatCompanyResultList,
  templateSelection: formatCompanySelection,
});
function formatCompanyResultList(company) {
  return company.company_name;
}

function formatCompanySelection(company) {
  return company.company_name || 'دیجی‌کالا';
}
// ---------------------------------------------------------------------
// ------------------- Handle AutoComplete For Job Title ---------------
// ---------------------------------------------------------------------
$('#job_id').select2({
  placeholder: 'توسعه‌دهنده فرانت‌اند',
  dir: 'rtl',
  language: 'fa',
  minimumInputLength: 3,
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
  ajax: {
    url: '/api/get-jobs',
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: $.trim(params.term),
      };
    },
    processResults: function (data) {
      return {
        results: $.map(data, function (item) {
          return {
            id: item.id,
            job_title: item.job_title,
          };
        }),
      };
    },
    cache: true,
  },

  templateResult: formatJobResultList,
  templateSelection: formatJobSelection,
});
function formatJobResultList(job) {
  return job.job_title;
}

function formatJobSelection(job) {
  return job.job_title || 'توسعه‌دهنده فرانت‌اند';
}
// ---------------------------------------------------------------------
// ------------------- Handle AutoComplete For Requirements ---------------
// ---------------------------------------------------------------------
$('#requirements__tags').select2({
  // https://stackoverflow.com/questions/14229768/tagging-with-ajax-in-select2
  placeholder: 'جاوااسکریپت',
  dir: 'rtl',
  language: 'fa',
  minimumInputLength: 3,
  tags: true,
  multiple: true,
  tokenSeparators: [','],
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
  // data: ['انگولار', 'HTML', 'CSS'],
  // data: default_data__requirements,
  ajax: {
    url: '/api/get-requirements',
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: $.trim(params.term),
      };
    },
    processResults: function (data) {
      return {
        results: $.map(data, function (item) {
          return {
            id: item.requirement_title,
            requirement_title: item.requirement_title,
          };
        }),
      };
    },
    cache: true,
  },
  templateResult: formatRequirementResultList,
  templateSelection: formatRequirementSelection,
});
function formatRequirementResultList(requirement) {
  return requirement.requirement_title;
}
function formatRequirementSelection(requirement) {
  return requirement.requirement_title || requirement.text || 'جاوااسکریپت';
}
$('#requirements__tags')
  .children('option')
  .attr('selected', true)
  .trigger('change');

// ---------------------------------------------------------------------
// ------------------- Handle selectbox For salary ---------------
// ---------------------------------------------------------------------
$('#salary').select2({
  placeholder: 'لطفا میزان حقوق را انتخاب نمایید',
  dir: 'rtl',
  language: 'fa',
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
});
// ---------------------------------------------------------------------
// ------------------- Handle selectbox For seniority ---------------
// ---------------------------------------------------------------------
$('#seniority').select2({
  placeholder: 'لطفا سطح ارشدیت را انتخاب نمایید',
  dir: 'rtl',
  language: 'fa',
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
});
// ---------------------------------------------------------------------
// ------------------- Handle selectbox For work_type ---------------
// ---------------------------------------------------------------------
$('#work_type').select2({
  placeholder: 'لطفا نوع همکاری را انتخاب نمایید',
  dir: 'rtl',
  language: 'fa',
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
});

// ---------------------------------------------------------------------
// ------------------- Create Company In Modal Validation --------------
// ---------------------------------------------------------------------
const createCompanyInModalDetails = {
  company_name: {
    required: true,
    minLength: 5,
    maxLength: 25,
  },
  office_population: {
    required: true,
  },
  company_url: {
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  central_office: {
    required: true,
    minLength: 3,
    maxLength: 25,
  },
};
const createCompanyInModal = document.querySelector(
  '#create-company-in-modal-form'
);
const createCompanyInModalValidator = new FormValidation(
  createCompanyInModal,
  createCompanyInModalDetails
);
createCompanyInModal.addEventListener('submit', (event) => {
  if (!createCompanyInModalValidator.formHasError()) {
    const formData = Object.fromEntries(new FormData(createCompanyInModal));
    const http = new EasyHTTP();
    const apiFormAction = createCompanyInModal.dataset.secondaryAction;
    http
      .post(apiFormAction, formData)
      .then((data) => {
        if (data.status === true) {
          console.log(data);
          window.location.href = data.redirectTo;
        } else if (data.status === false) {
          console.log(data);
          createCompanyInModalValidator.form.querySelector(
            "button[type='submit']"
          ).disabled = false;
        }
      })
      .catch((err) => console.warn(err));
  }
});
// ---------------------------------------------------------------------
// ------------------- Handle office population in modal ---------------
// ---------------------------------------------------------------------
$('#office_population').select2({
  placeholder: 'لطفا نوع همکاری را انتخاب نمایید',
  dir: 'rtl',
  language: 'fa',
  dropdownCssClass: 'select2__dropdown-custom-style border-0 outline-0',
});
// ---------------------------------------------------------------------
// ------------------- Create Job Title In Modal Validation ------------
// ---------------------------------------------------------------------
const createJobTitleInModalDetails = {
  job_title: {
    required: true,
    minLength: 5,
    maxLength: 50,
  },
};
const createJobTitleInModal = document.querySelector(
  '#create-job-title-in-modal-form'
);
const createJobTitleInModalValidator = new FormValidation(
  createJobTitleInModal,
  createJobTitleInModalDetails
);
createJobTitleInModal.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!createJobTitleInModalValidator.formHasError()) {
    const formData = Object.fromEntries(new FormData(createJobTitleInModal));
    const http = new EasyHTTP();
    const apiFormAction = createJobTitleInModal.dataset.secondaryAction;
    http
      .post(apiFormAction, formData)
      .then((data) => {
        if (data.status === true) {
          console.log(data);
          window.location.href = data.redirectTo;
        } else if (data.status === false) {
          console.log(data);
          createJobTitleInModalValidator.form.querySelector(
            "button[type='submit']"
          ).disabled = false;
        }
      })
      .catch((err) => console.warn(err));
  }
});
