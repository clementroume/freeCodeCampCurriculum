// Fetching DOM elements
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Function to check if the phone number is valid
const checkValidNumber = (input) => {
  resultsDiv.innerHTML = ""; // Reset the results

  if (input === "") {
    alert("Please provide a phone number."); // Alert message if the input is empty
    return;
  }

  // Regex to validate a US phone number
  const phoneRegex = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

  // Validation result
  resultsDiv.innerHTML = `
  <p class="results-text">
	${phoneRegex.test(input) ? "Valid" : "Invalid"} US number: ${input}
  </p>
  `;
};

// Event listener for the "Check" button click
checkBtn.addEventListener("click", () => {
  checkValidNumber(userInput.value);
  userInput.value = "";
});

// Event listener for Enter key validation
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkValidNumber(userInput.value);
  }
  userInput.value = "";
});

// Event listener for clearing the results
clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
  userInput.value = "";
});
