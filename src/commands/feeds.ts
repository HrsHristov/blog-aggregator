import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";

export const addFeedHandler = async (cmdName: string, ...args: string[]) => {
    if (args.length < 2) {
        throw new Error(
            `Insufficient arguments for ${cmdName}. Usage: ${cmdName} <feedName> <feedUrl>`
        );
    }
    const config = readConfig();
    const user = await getUserByName(config.currentUserName);
    if (!user) {
        throw new Error(`User ${config.currentUserName} not found.`);
    }
    const [feedName, feedUrl] = args;
    const feed = await createFeed(feedName, feedUrl, user.id);
    if (!feed) {
        throw new Error(`Failed to create feed ${feedName}.`);
    }

    printFeed(feed, user);
};

function printFeed(feed: Feed, user: User) {
    console.log("-----------------------------");
    console.log(`Feed URL:      ${feed.id}`);
    console.log(`Created At:    ${feed.createdAt}`);
    console.log(`Updated At:    ${feed.updatedAt}`);
    console.log(`Feed Name:     ${feed.name}`);
    console.log(`Feed URL:      ${feed.url}`);
    console.log(`User:          ${user.name}`);
    console.log("-----------------------------");
}
