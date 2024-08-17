/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const obj = {};

  if (!Array.isArray(transactions)) {
    return [];
  }

  transactions.forEach((element) => {
    if (element.category && typeof element.price === "number") {
      if (!obj[element.category]) {
        obj[element.category] = 0;
      }
      obj[element.category] += element.price;
    }
  });
  const results = Object.keys(obj).map((category) => ({
    category,
    totalSpent: obj[category],
  }));

  return results;
}

module.exports = calculateTotalSpentByCategory;
