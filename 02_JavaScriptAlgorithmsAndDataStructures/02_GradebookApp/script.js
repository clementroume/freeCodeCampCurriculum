function getAverage(scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  return sum / scores.length;
}
console.log("getAverage :");
console.log(
  "92, 88, 12, 77, 57, 100, 67, 38, 97, 89 : " +
    getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89])
);
console.log(
  "45, 87, 98, 100, 86, 94, 67, 88, 94, 95 : " +
    getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95])
);
console.log("\n");

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
console.log("getGrade :");
console.log("96 : " + getGrade(96));
console.log("82 : " + getGrade(82));
console.log("36 : " + getGrade(56));
console.log("\n");

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}
console.log("hasPassingGrade :");
console.log("100 : " + hasPassingGrade(100));
console.log("53 : " + hasPassingGrade(53));
console.log("87 : " + hasPassingGrade(87));
console.log("\n");

function studentMsg(totalScores, studentScore) {
  if (hasPassingGrade(studentScore)) {
    return (
      "Class average: " +
      getAverage(totalScores) +
      ". Your grade: " +
      getGrade(studentScore) +
      ". You passed the course."
    );
  } else {
    return (
      "Class average: " +
      getAverage(totalScores) +
      ". Your grade: " +
      getGrade(studentScore) +
      ". You failed the course."
    );
  }
}
console.log("studentMsg :");
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 67));
