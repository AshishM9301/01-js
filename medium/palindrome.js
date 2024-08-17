/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let newStr = str
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "")
    .split("");
  let revStr = [...newStr].reverse();

  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] !== revStr[i]) {
      return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
