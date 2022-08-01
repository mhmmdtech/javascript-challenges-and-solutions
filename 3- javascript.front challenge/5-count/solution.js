const count = (string) => {
  return string.split('').reduce((total, letter) => {
    total[letter] ? total[letter]++ : (total[letter] = 1);
    return total;
  }, {});
};

// console.log(count('')); // {}
// console.log(count('aba')); // {a: 2, b: 1}
const counterForm = document.querySelector('#counterForm');
const outputResult = document.querySelector('#outputResult');
counterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let mainString = counterForm.string.value.trim();
  let counterObj = count(mainString);
  outputResult.textContent = JSON.stringify(counterObj);
  counterForm.reset();
  return false;
});
