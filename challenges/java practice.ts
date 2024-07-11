function numberToPower(number, power) {
  let result = 1;
  for (let i = 0; i < power; i++) {
    result *= number;
  }
  return result;
}

console.log(numberToPower(3, 2)); // 9
console.log(numberToPower(2, 3)); // 8
console.log(numberToPower(10, 6)); // 1000000