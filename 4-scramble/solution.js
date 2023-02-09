const scramble = (str1, str2) => {
  const count = {};

  str2.split('').forEach((c) => {
    count[c] = count[c] ? (count[c] += 1) : 1;
  });
  str1.split('').forEach((c) => {
    count[c] && count[c]--;
  });

  return Object.keys(count).every((key) => count[key] === 0);
};

// console.log(scramble('scriptjava', 'javascript')); // true
// console.log(scramble('scriptingjava', 'javascript')); // true
// console.log(scramble('scriptsjava', 'javascripts')); // true
// console.log(scramble('jscripts', 'javascript')); // false
const scrambleForm = document.querySelector('#scrambleForm');
const outputResult = document.querySelector('#outputResult');
scrambleForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let areInputsEmpty =
    scrambleForm.main_word.value === '' ||
    scrambleForm.shuffled_word.value === '';
  if (!areInputsEmpty) {
    let mainString = scrambleForm.main_word.value.trim();
    let shuffledString = scrambleForm.shuffled_word.value.trim();
    let result = scramble(shuffledString, mainString);
    let resultMessage =
      result === true ? "Yes, They're scrambled" : "No, They aren't scrambled";
    outputResult.textContent = resultMessage;
  }
  scrambleForm.reset();
  return false;
});
