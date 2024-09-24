const character = "%";
const count = 12;
const rows = [];
let inverted = false;

// pyramid row function
function padRow(rowNumber, rowCount) {
  return (
    " ".repeat(rowCount - rowNumber) +
    character.repeat(2 * rowNumber - 1) +
    " ".repeat(rowCount - rowNumber)
  );
}

// fill [rows] array with pyramid row function
for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count)); // .unshift add in front of the first element / inverse = .shift
  } else {
    rows.push(padRow(i, count)); // .push add behind the last element / inverse = .pop
  }
}

// display each [row] array element on a single line
let result = "";
for (const row of rows) {
  result = result + "\n" + row;
}
console.log(result);
