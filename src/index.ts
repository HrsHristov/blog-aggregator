import { aggrHandler } from "./commands/aggregate";
import {
    CommandsRegistry,
    registerCommand,
    runCommand,
} from "./commands/commands";
import {
    followHandler,
    unfollowHandler,
    listFeedFollowsHandler,
} from "./commands/feed-follows";
import { addFeedHandler, feedsHandler } from "./commands/feeds";
import { resetHandler } from "./commands/reset";
import {
    loginHandler,
    registerHandler,
    getUsersHandler,
} from "./commands/users";

import { middlewareLoggedIn } from "./middleware";
import { browseHandler } from "./commands/browse";

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
    registerCommand(commandsRegistry, "agg", aggrHandler);
    registerCommand(
        commandsRegistry,
        "addfeed",
        middlewareLoggedIn(addFeedHandler)
    );
    registerCommand(commandsRegistry, "feeds", feedsHandler);
    registerCommand(
        commandsRegistry,
        "follow",
        middlewareLoggedIn(followHandler)
    );
    registerCommand(
        commandsRegistry,
        "following",
        middlewareLoggedIn(listFeedFollowsHandler)
    );
    registerCommand(
        commandsRegistry,
        "unfollow",
        middlewareLoggedIn(unfollowHandler)
    );
    registerCommand(
        commandsRegistry,
        "browse",
        middlewareLoggedIn(browseHandler)
    );

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
