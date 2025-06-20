
// 1Print numbers from 1 to 10

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 2Print all even numbers from 1 to 20

for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}

// 3Print the square of numbers from 1 to 5

for (let i = 1; i <= 5; i++) {
  console.log(i * i);
}

// 4Print the sum of numbers from 1 to 100

let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log("Sum:", sum);

// 5Print a multiplication table of 7

for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}

// 6Print numbers from 10 to 1 in reverse

for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// 7Print only the odd numbers between 15 and 30

for (let i = 15; i <= 30; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// 8Print the factorial of a number 

let num = 5;
let fact = 1;
for (let i = 1; i <= num; i++) {
  fact *= i;
}
console.log(`Factorial of ${num} is ${fact}`);

// 9Print all numbers between 1 and 50 divisible by both 3 and 5

for (let i = 1; i <= 50; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(i);
  }
}

// 10Count how many numbers between 1 and 100 are divisible by 9

let count = 0;
for (let i = 1; i <= 100; i++) {
  if (i % 9 === 0) {
    count++;
  }
}
console.log("Count divisible by 9:", count);

