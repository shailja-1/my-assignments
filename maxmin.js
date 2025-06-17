function findMinMax(arr) {
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  return { min, max };
}


let numbers = [5, 2, 9, 1, 7];
let result = findMinMax(numbers);

console.log("Min:", result.min);  
console.log("Max:", result.max);  