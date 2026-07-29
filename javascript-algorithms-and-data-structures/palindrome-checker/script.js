const userInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
  if (userInput.value === "") {
    alert("Please input a value");
  } else {
    const cleanedInput = userInput.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const cleanedInputReversed = cleanedInput.split("").reverse().join("");
    
    if (cleanedInput === cleanedInputReversed) {
      result.innerText = `${userInput.value} is a palindrome`;
    } else {
      result.innerText = `${userInput.value} is not a palindrome`;
    }
  }
});
