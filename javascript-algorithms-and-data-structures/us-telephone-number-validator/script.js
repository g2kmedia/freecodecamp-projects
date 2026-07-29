let userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
let result = document.getElementById("results-div");

const numberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

clearBtn.addEventListener("click", () => {
  userInput.value = "";
  result.innerText = "";
})

checkBtn.addEventListener("click", () => {
  let inputText = userInput.value;
  inputText === "" ? alert("Please provide a phone number") : validateNumber(inputText);
})

function validateNumber(inputText) {
  if (numberRegex.test(inputText)) {
    result.innerText = "Valid US Number: " + inputText;
    userInput.value = "";
  } else {
      result.innerText = "Invalid US number: " + inputText;
      userInput.value = "";
    }
}
