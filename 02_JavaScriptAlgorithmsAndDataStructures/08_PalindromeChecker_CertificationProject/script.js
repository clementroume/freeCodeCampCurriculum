const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

function checkForPalindrome(input) {
  if (input === "") {
    alert("Please input a value");
    return;
  }

  resultDiv.replaceChildren();

  const resultP = document.createElement("p");
  resultP.className = "user-input";
  const cleanLowercaseInput = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  resultP.innerHTML = `<strong>${input}</strong> ${
    cleanLowercaseInput === cleanLowercaseInput.split("").reverse().join("")
      ? "is"
      : "is not"
  } a palindrome.`;
  resultDiv.appendChild(resultP);
  resultDiv.removeAttribute("hidden");
}

checkBtn.addEventListener("click", () => {
  checkForPalindrome(textInput.value);
  textInput.value = "";
});

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkForPalindrome(textInput.value);
    textInput.value = "";
  }
});
