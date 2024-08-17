/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let numberOfVowels = 0;

  let newStr = str.toLowerCase().split("");

  newStr.forEach((element) => {
    if (["a", "e", "i", "o", "u"].includes(element)) {
      numberOfVowels += 1;
    }
  });

  return numberOfVowels;

  // Your code here
}

module.exports = countVowels;
