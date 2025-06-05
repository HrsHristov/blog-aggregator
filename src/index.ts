import { run } from "node:test";
import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { loginHandler } from "./users";

function main() {
    const args = process.argv;
    if (args.length < 3) {
        console.error("Invalid Command");
        process.exit(1);
    }

    const [, , cmdName, ...cmdArgs] = args;

    const commandsRegistry: CommandsRegistry = {};
    registerCommand(commandsRegistry, cmdName, loginHandler);

    try {
        runCommand(commandsRegistry, cmdName, ...cmdArgs);
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                `Error running command "${cmdName}": ${error.message}`
            );
        } else {
            console.error(`Error running command "${cmdName}":`, error);
        }
        process.exit(1);
    }
}

main();
