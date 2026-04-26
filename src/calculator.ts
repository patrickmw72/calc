import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

function evaluate(expression: string): string {
  try {
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      return "Invalid characters";
    }

    return Function(`"use strict"; return (${expression})`)().toString();
  } catch {
    return "Error";
  }
}

async function run() {
  console.log("CLI Calculator");
  console.log("Type 'exit' to quit\n");

  while (true) {
    const line = await rl.question("calc> ");

    if (line.toLowerCase() === "exit") break;

    console.log(evaluate(line));
  }

  rl.close();
}

run();