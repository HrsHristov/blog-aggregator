import { getFeedbyUrl } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";

export async function followHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(
            `Invalid number of arguments for command "${cmdName}". Usage: ${cmdName} <feed_url>`
        );
    }

    const config = readConfig();
    const user = await getUserByName(config.currentUserName);

    if (!user) {
        throw new Error(`User ${config.currentUserName} is not found.`);
    }

    const feedUrl = args[0];
    const feed = await getFeedbyUrl(feedUrl);
    if (!feed) {
        throw new Error(`Feed with URL ${feedUrl} does not exist.`);
    }

    const createFollow = await createFeedFollow(user.id, feed.id);
    printFollowedFeed(createFollow.userName, createFollow.feedName);
}

export function printFollowedFeed(feedUrl: string, userName: string) {
    console.log("-----------------------------");
    console.log(`Feed followed successfully!`);
    console.log(`Feed URL:      ${feedUrl}`);
    console.log(`Followed by:   ${userName}`);
    console.log("-----------------------------");
}
