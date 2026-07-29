export const handleKeyPress = (event, state, callbacks) => {
  const { key } = event;
  const { getNumber, getOperator, equals, clear } = callbacks;

  if (Object.values(state.numbers).toString().includes(key)) {
    return getNumber(key);
  }

  if (Object.values(state.operations).includes(key)) {
    return getOperator(key);
  }

  if (key === "Enter") {
    event.preventDefault();
    return equals();
  }

  if (key === "c") {
    return clear();
  }

  if (key === "Backspace") {
    return (prevState) => ({
      primaryDisplay: prevState.primaryDisplay.slice(0, -1)
    });
  }
};

export const getNumber = (number, state) => {
  if (number === "." && state.primaryDisplay.includes(".")) {
    return null;
  }

  if (number === "." && state.primaryDisplay === "") {
    return {
      primaryDisplay: "0."
    };
  }

  return {
    primaryDisplay:
      state.primaryDisplay === "0"
        ? number.toString()
        : state.primaryDisplay + number // Check to not allow multiple zeros in the beginning of the input
  };
};

export const getOperator = (operator, state, immediateCalculationCallback) => {
  // Use "-" to create a negative number
  if (state.primaryDisplay === "" && operator === "-") {
    return {
      primaryDisplay: "-"
    };
  }

  if (state.primaryDisplay === "-") {
    return {
      historyDisplay: state.historyDisplay.slice(0, -1) + operator,
      primaryDisplay: "",
      operator: operator
    };
  }

  // Replace the current operator with new one, except for "-" due to use with negative numbers
  if (
    /[+*/]/.test(state.historyDisplay) &&
    state.primaryDisplay === ""
  ) {
    return {
      historyDisplay: state.historyDisplay.slice(0, -1) + operator
    };
  }

  if (state.immediateLogic && state.historyDisplay) {
    return immediateCalculationCallback(operator);
  }

  if (state.historyDisplay !== "" && state.primaryDisplay !== "") {
    return {
      historyDisplay: state.historyDisplay + state.primaryDisplay + operator,
      primaryDisplay: ""
    };
  }

  return {
    historyDisplay: state.primaryDisplay + operator,
    primaryDisplay: "",
    operator: operator
  };
};

export const equals = (state, immediateCalculationCallback) => {
  const regex = /[\d+\-*\/.]/;

  if (state.historyDisplay) {
    if (!regex.test(state.historyDisplay)) {
      console.error("Cannot calculate");
      return null;
    }
  }

  if (state.immediateLogic && state.historyDisplay) {
    return immediateCalculationCallback(undefined, true);
  }

  let result;

  if (state.primaryDisplay !== "" && state.historyDisplay !== "") {
    result = eval(state.historyDisplay + state.primaryDisplay);
  } else if (
    state.historyDisplay !== "" &&
    state.primaryDisplay === ""
  ) {
    result = eval(state.historyDisplay.slice(0, -1));
  } else if (
    state.historyDisplay === "" &&
    state.primaryDisplay !== ""
  ) {
    result = state.primaryDisplay;
  }

  const roundedResult =
    Math.abs(result) % 1 !== 0 && result.toString().split(".")[1].length > 4
      ? Math.round(result * 10000) / 10000
      : result;

  return {
    historyDisplay: "",
    primaryDisplay: roundedResult.toString()
  };
};

export const clear = () => {
  return {
    historyDisplay: "",
    primaryDisplay: ""
  };
};

export const immediateCalculation = (state, currentOperator, isEquals) => {
  let result;
  const a = /[+\-*\/]/.test(state.historyDisplay)
    ? Number(state.historyDisplay.slice(0, -1))
    : Number(state.historyDisplay);
  const b = Number(state.primaryDisplay);

  switch (state.operator) {
    case "/":
      result = a / b;
      break;
    case "*":
      result = a * b;
      break;
    case "-":
      result = a - b;
      break;
    case "+":
      result = a + b;
      break;
  }

  if (isEquals) {
    return {
      historyDisplay: "",
      primaryDisplay: result.toString(),
      operator: ""
    };
  }

  return {
    historyDisplay: result.toString() + currentOperator,
    primaryDisplay: "",
    operator: currentOperator
  };
};

export const toggleInfoBox = (state) => {
  return {
    showInfoBox: state
  };
};

export const toggleCalcLogic = (state) => {
  return {
    immediateLogic: !state.immediateLogic,
    historyDisplay: "",
    primaryDisplay: ""
  };
};
