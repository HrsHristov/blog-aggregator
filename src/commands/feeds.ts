import { readConfig } from "../config";
import { createFeed, getAllFeeds } from "../lib/db/queries/feeds";
import { getUserById, getUserByName } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { printFollowedFeed } from "./feed-follows";

export const addFeedHandler = async (
    cmdName: string,
    user: User,
    ...args: string[]
) => {
    if (args.length < 2) {
        throw new Error(
            `Insufficient arguments for ${cmdName}. Usage: ${cmdName} <feedName> <feedUrl>`
        );
    }

    const [feedName, feedUrl] = args;
    const feed = await createFeed(feedName, feedUrl, user.id);
    if (!feed) {
        throw new Error(`Failed to create feed ${feedName}.`);
    }

    const follow = await createFeedFollow(user.id, feed.id);
    printFollowedFeed(follow.feedName, follow.userName);

    printFeed(feed, user);
};

export const feedsHandler = async (_: string) => {
    const feeds = await getAllFeeds();

    if (feeds.length === 0) {
        console.log("No feeds found.");
        return;
    }

    for (const feed of feeds) {
        const user = await getUserById(feed.userId);
        if (!user) {
            throw new Error(`Failed to find user for feed ${feed.id}.`);
        }

        printFeed(feed, user);
    }
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
