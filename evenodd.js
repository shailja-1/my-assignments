let numbers = [10, 15, 22, 33, 40];

numbers.forEach(function(num) {
  if (num % 2 === 0) {
    console.log(num + " is even");
  } else {
    console.log(num + " is odd");
  }
});
