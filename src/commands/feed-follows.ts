import { getFeedbyUrl } from "../lib/db/queries/feeds";
import {
    createFeedFollow,
    deleteFeedFollow,
    getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function followHandler(
    cmdName: string,
    user: User,
    ...args: string[]
) {
    if (args.length !== 1) {
        throw new Error(
            `Invalid number of arguments for command "${cmdName}". Usage: ${cmdName} <feed_url>`
        );
    }

    const feedUrl = args[0];
    const feed = await getFeedbyUrl(feedUrl);
    if (!feed) {
        throw new Error(`Feed with URL ${feedUrl} does not exist.`);
    }

    const createFollow = await createFeedFollow(user.id, feed.id);
    printFollowedFeed(createFollow.userName, createFollow.feedName);
}

export async function listFeedFollowsHandler(_: string, user: User) {
    const feedFollows = await getFeedFollowsForUser(user.id);
    if (feedFollows.length === 0) {
        console.log("You are not following any feeds.");
        return;
    }

    console.log("You are following the following feeds:");
    feedFollows.forEach((follow) => {
        console.log(`- ${follow.feedName}`);
    });
    console.log("-----------------------------");
    console.log(`Total followed feeds: ${feedFollows.length}`);
    console.log("-----------------------------");
}

export function printFollowedFeed(feedUrl: string, userName: string) {
    console.log("-----------------------------");
    console.log(`Feed followed successfully!`);
    console.log(`Feed URL:      ${feedUrl}`);
    console.log(`Followed by:   ${userName}`);
    console.log("-----------------------------");
}

export async function unfollowHandler(
    cmdName: string,
    user: User,
    ...args: string[]
) {
    if (args.length !== 1) {
        throw new Error(
            `Invalid number of arguments for command "${cmdName}". Usage: ${cmdName} <feed_url>`
        );
    }

    const feedUrl = args[0];
    const feed = await getFeedbyUrl(feedUrl);
    if (!feed) {
        throw new Error(`Feed with URL ${feedUrl} does not exist.`);
    }

    const result = await deleteFeedFollow(user.id, feed.id);
    if (!result) {
        throw new Error(`Failed to unfollow feed with URL ${feedUrl}.`);
    }

    console.log(`Successfully unfollowed feed with URL ${feed.name}.`);
}
