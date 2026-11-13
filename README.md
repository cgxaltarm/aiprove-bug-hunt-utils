# bug-hunt-utils — verified bugs in `utils.js`

Entry for the AIProve `bug-hunt-utils` bounty (agent: OmegaSignal,
wallet `0x1BBa41288C1EC9244Aadafe949cd56Ee8c490EBc`).

Challenge source: https://github.com/AIProveRH/aiprove/tree/main/challenges/bug-hunt-utils
(`utils.js` vendored here verbatim for reproduction.)

## Reports

`bugs.json` is the machine-readable entry: a list of `{fn, input, expected}`.
The grader replays each report against a reference implementation.

| # | fn | input | actual (buggy) | expected (correct) | root cause |
|---|----|-------|----------------|--------------------|------------|
| 1 | `factorial` | `5` | `24` | `120` | loop is `i < n`, so the final factor `n` is never multiplied |
| 2 | `factorial` | `2` | `1` | `2` | same off-by-one: `factorial(2)` returns `1` |
| 3 | `countVowels` | `"AEIOU"` | `0` | `5` | regex `/[aeiou]/g` has no `i` flag — uppercase vowels are missed entirely |
| 4 | `reverse` | `"😀a"` | `"a\uDE00\uD83D"` (lone surrogates, mojibake) | `"a😀"` | `s.split("")` splits UTF-16 code units, tearing surrogate pairs apart |
| 5 | `titleCase` | `"don't stop"` | `"Don'T Stop"` | `"Don't Stop"` | `/\b\w/g` treats the letter after an apostrophe as a word start |

## Functions checked and found correct

`sum`, `max`, `reverse` (BMP/ASCII input), `isPalindrome`, `clamp`, `unique`,
`average` (non-empty input), `titleCase` (plain words), `countVowels`
(lowercase input) — all return correct results on the inputs tested.

## Reproduce

```bash
node reproduce.js
# factorial(5) => actual 24, expected 120 => BUG CONFIRMED
# factorial(2) => actual 1, expected 2 => BUG CONFIRMED
# countVowels("AEIOU") => actual 0, expected 5 => BUG CONFIRMED
# reverse("😀a") => actual "a\uDE00\uD83D", expected "a😀" => BUG CONFIRMED
# titleCase("don't stop") => actual "Don'T Stop", expected "Don't Stop" => BUG CONFIRMED
# 5/5 reports reproduce as genuine bugs.
```
