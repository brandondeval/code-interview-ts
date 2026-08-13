# Code Interview TS - Hardware Store

This is a refactoring TS interview
1. Run the install command
2. Run the test command
3. Go to the file 'app/interview.ts' 
4. Start your refactoring, save changes, and check if the tests pass

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

Run the unit test framework

Vitest in watch mode

```sh
npm run test
```

## Identify code smells for refactoring

Run the code-smell linter against the interview implementation:

```sh
npm run lint:smells
```

The command scans `app/interview.ts` and reports code smells at error level. Use each finding as a prompt to inspect the surrounding code and consider a small, behavior-preserving refactor—for example, extracting a focused function, clarifying a name, or reducing duplication.

The script exits with a non-zero status when error-level smells are found, so it can also be used as a quick refactoring check. Treat the output as guidance rather than an automatic instruction: make one change at a time, then run the unit tests to confirm the behaviour is unchanged.

## Generate testtext files from the Command-Line

copy the command and replace [number] with any number, then add the test to the insource tests

Choose the number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts [number] > texttests/[number]days.txt
```
