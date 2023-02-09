//   get array difference
const arrayDiff = (a, b) => {
  let difference = a
    .filter((x) => !b.includes(x))
    .concat(b.filter((x) => !a.includes(x)));
  return difference;
};
const stringWithCommasToArray = (string) => {
  return string
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '');
};
// console.log(arrayDiff([1, 8, 2], [])); // [1, 8, 2]
// console.log(arrayDiff([1, 2, 3], [1, 2])); // [3]
// console.log(arrayDiff(['a', 'b'], ['a', 'b', 'c', 'd', 'b'])); // ['c', 'd']
const diffForm = document.querySelector('#diffForm');
const outputResult = document.querySelector('#outputResult');

diffForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstArray = stringWithCommasToArray(diffForm.first_array.value);
  let secondArray = stringWithCommasToArray(diffForm.second_array.value);
  let diffArray = arrayDiff(firstArray, secondArray);
  outputResult.textContent = `Difference Between 2 Arrays Are => ${diffArray.join(
    ', '
  )}`;
  diffForm.reset();

  return false;
});
