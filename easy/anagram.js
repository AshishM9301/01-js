/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.replace(/\s+/g, "").toLowerCase();
  str2 = str2.replace(/\s+/g, "").toLowerCase();

  if (str1.length !== str2.length) {
    return false;
  }

  const charCountMap1 = {};
  const charCountMap2 = {};

  for (const char of str1) {
    charCountMap1[char] = (charCountMap1[char] || 0) + 1;
  }

  for (const char of str2) {
    charCountMap2[char] = (charCountMap2[char] || 0) + 1;
  }

  for (const char in charCountMap1) {
    if (charCountMap1[char] !== charCountMap2[char]) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
