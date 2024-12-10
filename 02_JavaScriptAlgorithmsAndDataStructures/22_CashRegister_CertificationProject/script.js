// Price of the item
let price = 1.87;

// Initial cash in drawer (cid)
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];

// Select HTML elements for interaction and display
const screenText = document.getElementById('screen-text'); // Display total price
const changeDueDisplay = document.getElementById('change-due'); // Display change or status
const cashInput = document.getElementById('cash'); // Input field for cash provided by customer
const purchaseBtn = document.getElementById('purchase-btn'); // Button to confirm purchase
const drawerContents = document.getElementById('drawer-contents'); // Display current cash in drawer

// Map of denomination values in cents for easier calculations
const denominations = {
  'ONE HUNDRED': 10000,
  TWENTY: 2000,
  TEN: 1000,
  FIVE: 500,
  ONE: 100,
  QUARTER: 25,
  DIME: 10,
  NICKEL: 5,
  PENNY: 1,
};

// Function to display the results (change or status) in the UI
const displayResults = (status, change = []) => {
  if (status === 'No change due - customer paid with exact cash') {
    changeDueDisplay.innerHTML = `<p><strong>${status}</strong></p>`;
  } else {
    changeDueDisplay.innerHTML = `<p>Status: <strong>${status}</strong></p>`;
    if (change.length > 0) {
      changeDueDisplay.innerHTML += change
        .map(([name, amount]) => `<p>${name}: $${amount.toFixed(2)}</p>`)
        .join('');
    }
  }
};

// Function to update the cash drawer display in the UI
const updateCashDrawer = () => {
  drawerContents.innerHTML = ''; // Clear the previous display
  cid.forEach(([denomination, amount]) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${denomination}: $${amount.toFixed(2)}`;
    drawerContents.appendChild(listItem); // Add each denomination to the list
  });
};

// Function to update the screen display for total price
const updateScreen = () => {
  screenText.textContent = `Total: $${price.toFixed(2)}`;
};

// Function to calculate change and determine transaction status
const calculateChange = (cashInCents, priceInCents) => {
  let changeDue = cashInCents - priceInCents; // Amount of change to return
  const reversedCid = [...cid]
    .reverse()
    .map(([name, amount]) => [name, Math.round(amount * 100)]); // Reverse drawer and convert to cents
  const change = []; // Array to store change breakdown
  let totalDrawer = 0; // Total cash available in the drawer

  // Loop through each denomination and calculate the change
  reversedCid.forEach(([name, total]) => {
    const denomValue = denominations[name];
    totalDrawer += total;

    if (changeDue >= denomValue) {
      // Calculate the maximum possible amount to give for this denomination
      const amountToGive = Math.min(
        total,
        Math.floor(changeDue / denomValue) * denomValue
      );
      if (amountToGive > 0) {
        change.push([name, amountToGive / 100]);
        changeDue -= amountToGive; // Deduct from the remaining change due
      }
    }
  });

  // Determine final status based on remaining change and drawer total
  if (changeDue > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] }; // Not enough cash to make the transaction
  } else if (totalDrawer === cashInCents - priceInCents) {
    return { status: 'CLOSED', change }; // Exact match to empty the drawer
  } else {
    return { status: 'OPEN', change }; // Successful transaction with remaining drawer balance
  }
};

// Main function to process the purchase
const checkCashRegister = () => {
  const cash = parseFloat(cashInput.value); // Parse the cash input from the user
  if (isNaN(cash)) {
    alert('Please enter a valid cash amount.');
    return;
  }

  const cashInCents = Math.round(cash * 100); // Convert cash to cents
  const priceInCents = Math.round(price * 100); // Convert price to cents

  // Check for exact payment (no change needed)
  if (cashInCents === priceInCents) {
    displayResults('No change due - customer paid with exact cash');
    cashInput.value = ''; // Reset the input field
    return;
  }

  // Check if the customer provided enough cash
  if (cashInCents < priceInCents) {
    alert('Customer does not have enough money to purchase the item.');
    cashInput.value = ''; // Reset the input field
    return;
  }

  // Calculate the change and get the status
  const { status, change } = calculateChange(cashInCents, priceInCents);

  // Update the cash drawer based on the transaction
  if (status === 'OPEN' || status === 'CLOSED') {
    change.forEach(([name, amount]) => {
      const cidEntry = cid.find(([denom]) => denom === name);
      cidEntry[1] -= amount; // Deduct the given change from the drawer
    });
  }

  // Display the results and update the cash drawer display
  displayResults(status, change);
  updateCashDrawer(); // Refresh the drawer display
  cashInput.value = ''; // Reset the cash input field
};

// Add event listener to the purchase button
purchaseBtn.addEventListener('click', checkCashRegister);

// Initialize the screen and drawer display on page load
updateScreen();
updateCashDrawer();
