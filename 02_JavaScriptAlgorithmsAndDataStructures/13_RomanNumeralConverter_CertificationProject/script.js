const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertToRoman = (num) => {
  const ref = [
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
  const res = [];

  ref.forEach((arr) => {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
    }
  });

  return res.join("");
};

const checkUserInput = () => {
  if (output.classList.contains("alert")) {
    output.classList.remove("alert");
  }

  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    output.textContent = "Please enter a valid number";
    output.classList.add("alert");
    output.removeAttribute("hidden");
    return;
  } else if (inputInt < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    output.classList.add("alert");
    output.removeAttribute("hidden");
    return;
  } else if (inputInt > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
    output.classList.add("alert");
    return;
  } else {
    output.textContent = convertToRoman(inputInt);
    output.removeAttribute("hidden");
  }

  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
