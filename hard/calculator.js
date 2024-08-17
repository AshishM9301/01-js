/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(result = 0) {
    this.result = result;
  }

  add(num) {
    this.checkNumber(num);
    this.result += num;
    return this; // Allow method chaining
  }

  subtract(num) {
    this.checkNumber(num);
    this.result -= num;
    return this; // Allow method chaining
  }

  multiply(num) {
    this.checkNumber(num);
    this.result *= num;
    return this; // Allow method chaining
  }

  divide(num) {
    this.checkNumber(num);
    if (num === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    this.result /= num;
    return this; // Allow method chaining
  }

  clear() {
    this.result = 0;
    return this; // Allow method chaining
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    //change express in into array with regex check creation like tokens
    let tokens = this.tokensize(expression);

    // check if parantheis are valid token or the expression is valid
    if (!this.isValid(tokens)) {
      throw new Error("Invalid Expression");
    }

    //RPN (Reverse Polish Notation)
    const postfix = this.infixToPostfix(tokens);

    // Evaluate the postfix expression
    this.result = this.evaluatePostfix(postfix);

    return this;
  }

  tokensize(expression) {
    const regex = /\s*([+\-*/()])\s*|\s*(\d+(\.\d+)?)\s*/g;

    let tokens = [];
    let match;

    while ((match = regex.exec(expression)) !== null) {
      //match 1 is For operator/Paranthis Check

      if (match[1]) {
        tokens.push(match[1]);
      }

      //match 2 is For Number Check

      if (match[2]) {
        tokens.push(parseFloat(match[2]));
      }
    }

    return tokens;
  }

  isValid(tokens) {
    let lastToken = "";
    let operators = ["+", "-", "*", "/"];
    let openParans = [];

    for (const token of tokens) {
      if (typeof token === "number") {
        lastToken = "number";
      } else if (operators.includes(token)) {
        while (
          lastToken === "operator" ||
          lastToken === "openParans" ||
          lastToken === ""
        ) {
          return false;
        }
        lastToken = "operator";
      } else if (token === "(") {
        openParans.push(token);
        lastToken = "openParans";
      } else if (token === ")") {
        if (
          lastToken === "openParans" ||
          lastToken === "operator" ||
          openParans.length === 0
        ) {
          return false;
        }
        openParans.pop();
        lastToken = "closeParans";
      } else {
        return false;
      }
    }

    return openParans.length === 0 && lastToken !== "operator";
  }

  infixToPostfix(tokens) {
    const output = [];
    const operators = [];
    const check = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const checkOperator = (char) => ["+", "-", "*", "/"].includes(char);

    tokens.forEach((element) => {
      if (typeof element === "number") {
        output.push(element);
      } else if (element === "(") {
        operators.push(element);
      } else if (element === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          output.push(operators.pop());
        }
        operators.pop();
      } else if (checkOperator(element)) {
        while (
          operators.length &&
          check[operators[operators.length - 1]] >= check[element]
        ) {
          output.push(operators.pop());
        }
        operators.push(element);
      }
    });

    while (operators.length) {
      output.push(operators.pop());
    }

    return output;
  }

  evaluatePostfix(postfix) {
    const values = [];

    postfix.forEach((element) => {
      if (typeof element === "number") {
        values.push(element);
      } else {
        let b = values.pop();
        let a = values.pop();

        switch (element) {
          case "+":
            values.push(a + b);
            break;
          case "-":
            values.push(a - b);
            break;
          case "*":
            values.push(a * b);
            break;
          case "/":
            if (b === 0) {
              throw new Error("Division by Zero");
            }
            values.push(a / b);
            break;
          default:
            throw new Error("Invalid expressin");
        }
      }
    });

    return values[0];
  }

  checkNumber(num) {
    if (typeof num !== "number" || isNaN(num)) {
      throw new Error("Invalid input: not a number.");
    }
  }
}

module.exports = Calculator;
