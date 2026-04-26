import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// --- Safe evaluator ---
function evaluate(expression: string): string {
  try {
    // allow only safe characters
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return "Invalid characters";
    }

    const result = Function(`"use strict"; return (${expression})`)();
    return result.toString();
  } catch {
    return "Error";
  }
}

// --- CLI ARG MODE (for CI / scripting) ---
const arg = process.argv[2];

if (arg) {
  console.log(evaluate(arg));
  process.exit(0);
}

// --- INTERACTIVE MODE ---
async function runCLI() {
  const rl = readline.createInterface({ input, output });

  console.log("TypeScript CLI Calculator");
  console.log("Enter math expressions (e.g. 2+3*4)");
  console.log("Type 'exit' to quit\n");

  while (true) {
    const answer = await rl.question("calc> ");

    if (answer.trim().toLowerCase() === "exit") {
      break;
    }

    console.log(evaluate(answer));
  }

  rl.close();
}

runCLI();