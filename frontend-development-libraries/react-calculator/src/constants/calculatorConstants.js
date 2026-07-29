export const CALCULATOR_NUMBERS = {
  nine: 9,
  eight: 8,
  seven: 7,
  six: 6,
  five: 5,
  four: 4,
  three: 3,
  two: 2,
  one: 1,
  zero: 0,
  decimal: "."
};

export const CALCULATOR_OPERATIONS = {
  divide: "/",
  multiply: "*",
  subtract: "-",
  add: "+"
};

export const CALCULATOR_FUNCTIONS = {
  clear: "AC",
  equals: "="
};

// Central state storage for everything
// Initial state for the calculator
export const INITIAL_CALCULATOR_STATE = {
  showInfoBox: false,
  immediateLogic: false,
  historyDisplay: "",
  primaryDisplay: "",
  operator: "",
  numbers: CALCULATOR_NUMBERS,
  operations: CALCULATOR_OPERATIONS,
  functions: CALCULATOR_FUNCTIONS
};
