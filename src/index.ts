import {
    CommandsRegistry,
    registerCommand,
    runCommand,
} from "./commands/commands";
import { resetHandler } from "./commands/reset";
import {
    loginHandler,
    registerHandler,
    getUsersHandler,
} from "./commands/users";

async function main() {
    const args = process.argv;
    if (args.length < 3) {
        console.error("Invalid Command");
        process.exit(1);
    }

    const [, , cmdName, ...cmdArgs] = args;

    const commandsRegistry: CommandsRegistry = {};
    registerCommand(commandsRegistry, "login", loginHandler);
    registerCommand(commandsRegistry, "register", registerHandler);
    registerCommand(commandsRegistry, "reset", resetHandler);
    registerCommand(commandsRegistry, "users", getUsersHandler);

    try {
        await runCommand(commandsRegistry, cmdName, ...cmdArgs);
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
    process.exit(0);
}

main();
