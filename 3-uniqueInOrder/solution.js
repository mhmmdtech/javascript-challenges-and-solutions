const uniqueInOrder = (iterable) => {
  let strArr = Array.isArray(iterable) ? iterable : iterable.split('');
  let unique = strArr.filter((letter, i) => {
    return strArr[i] != strArr[i + 1];
  });
  return unique;
};
const stringWithCommasToArray = (string) => {
  return string
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '');
};
// console.log(uniqueInOrder([1, 2, 2, 3, 3])); // [1, 2, 3]
// console.log(uniqueInOrder('ABBCcAD')); // ['A', 'B', 'C', 'c', 'A', 'D']
const myForm = document.querySelector('#myForm');
const outputResult = document.querySelector('#outputResult');
myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (myForm.array.value !== '') {
    let myArray = stringWithCommasToArray(myForm.array.value);
    let uniqueArray = uniqueInOrder(myArray);
    outputResult.textContent = `Unique Array Items In Order => ${uniqueArray.join(
      ', '
    )}`;
  }
  myForm.reset();
  return false;
});
