const $btn = document.getElementById("convert-btn");
const $output = document.getElementById("output");
const $inputUsr = document.getElementById("number");

const reset = () => {
  $output.textContent = "";
};

const getRandomCharacter = () => {
  const characters = "MCDXLIV1234567890";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

const decipherText = (interval, currentIndex, romanNumber) => {
  clearInterval(interval);

  interval = setInterval(() => {
    let displayText = "";

    for (let i = 0; i < romanNumber.length; i++) {
      if (i < currentIndex) {
        displayText += romanNumber[i];
      } else {
        displayText += getRandomCharacter();
      }
    }

    $output.textContent = displayText;

    if (currentIndex < romanNumber.length) {
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const displayText = (romanNumber) => {
  let interval;
  let currentIndex = 0;

  decipherText(interval, currentIndex, romanNumber);
};

const convertDecimalToRomanNumber = (number) => {
  const romanValuesArray = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let romanNumberArray = [];

  romanValuesArray.forEach((romanValue) => {
    while (number >= romanValue[1]) {
      number = number - romanValue[1];

      romanNumberArray.push(romanValue[0]);
    }
  });

  const romanNumber = romanNumberArray.join("");

  displayText(romanNumber);
};

const getNumberAndValidation = () => {
  const number = Number($inputUsr.value);
  reset();

  if (!number) return ($output.textContent = "Please enter a valid number.");
  if (number < 0)
    return ($output.textContent =
      "Please enter a number greater than or equal to 1.");
  if (number > 3999)
    return ($output.textContent =
      "Please enter a number less than or equal to 3999.");

  convertDecimalToRomanNumber(number);
};

$btn.addEventListener("click", getNumberAndValidation);
$inputUsr.addEventListener("keypress", (e) => {
  if (e.key === "Enter") return getNumberAndValidation();
});
