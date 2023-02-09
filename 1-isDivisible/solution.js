const isDivisible = (n, x, y) => {
  return n % x === 0 && n % y === 0;
};
// console.log(isDivisible(3, 3, 4)); // false
// console.log(isDivisible(12, 3, 4)); // true

const isDivisibleForm = document.querySelector('#isDivisibleForm');
const outputResult = document.querySelector('#outputResult');

isDivisibleForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let allInputsAreInteger =
    isFinite(isDivisibleForm.first_number.value) &&
    isFinite(isDivisibleForm.second_number.value) &&
    isFinite(isDivisibleForm.third_number.value);
  if (allInputsAreInteger) {
    let result = isDivisible(
      isDivisibleForm.first_number.value,
      isDivisibleForm.second_number.value,
      isDivisibleForm.third_number.value
    );
    let resultMessage =
      result === true ? 'Yes, is Divisible' : "No, Isn't Divisible ";
    outputResult.textContent = resultMessage;
  }
  isDivisibleForm.reset();
  return false;
});
