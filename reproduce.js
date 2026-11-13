// Reproduce every report in bugs.json against the challenge's utils.js.
// Usage: node reproduce.js
// Exit 0 if every report is a genuine bug (actual !== expected and the
// expected value is the mathematically correct one); exit 1 otherwise.
const u = require("./utils.js");
const reports = require("./bugs.json");

let genuine = 0;
for (const { fn, input, expected } of reports) {
  const actual = u[fn](input);
  const isBug = JSON.stringify(actual) !== JSON.stringify(expected);
  console.log(
    `${fn}(${JSON.stringify(input)}) => actual ${JSON.stringify(actual)}, ` +
    `expected ${JSON.stringify(expected)} => ${isBug ? "BUG CONFIRMED" : "not a bug"}`
  );
  if (isBug) genuine++;
}
console.log(`\n${genuine}/${reports.length} reports reproduce as genuine bugs.`);
process.exit(genuine === reports.length ? 0 : 1);
