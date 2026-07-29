const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanNumerals = [
  {
    arabic: 1000,
    roman: "M"
  },
  {
    arabic: 900,
    roman: "CM"
  },
  {
    arabic: 500,
    roman: "D"
  },
  {
    arabic: 400,
    roman: "CD"
  },
  {
    arabic: 100,
    roman: "C"
  },
  {
    arabic: 90,
    roman: "XC"
  },
  {
    arabic: 50,
    roman: "L"
  },
  {
    arabic: 40,
    roman: "XL"
  },
  {
    arabic: 10,
    roman: "X"
  },
  {
    arabic: 9,
    roman: "IX"
  },
  {
    arabic: 5,
    roman: "V"
  },
  {
    arabic: 4,
    roman: "IV"
  },
  {
    arabic: 1,
    roman: "I"
  }
];

function toRomanNumeral() {
  let inputToNumber = parseInt(input.value);
  let romanNumeral = "";

  romanNumerals.forEach((obj) => {
    while (obj.arabic <= inputToNumber) {
      romanNumeral += obj.roman;
      inputToNumber -= obj.arabic;
    }
  });

  output.innerText = romanNumeral;
}

convertBtn.addEventListener("click", () => {
  if (input.value === "")  {
    output.innerText = "Please enter a valid number";
  } else if (input.value <= 0) {
      output.innerText = "Please enter a number greater than or equal to 1";
  } else if (input.value >= 4000) {
      output.innerText = "Please enter a number less than or equal to 3999";
  } else {
    toRomanNumeral();
  }
});
