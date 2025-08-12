import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { Feed } from "../lib/db/schema";
import { fetchFeed } from "../lib/rss";
import { parseDuration } from "../lib/time";

export async function aggrHandler(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time_between_reqs`);
    }

    const timeArg = args[0];
    const timeBetweenRequests = parseDuration(timeArg);
    if (!timeBetweenRequests) {
        throw new Error(
            `Invalid duration: ${timeArg}. use format 1h 30m 15s or 1450ms`
        );
    }

    console.log(`Collecting feeds every ${timeArg}...`);

    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Stopping feed collection...");
            clearInterval(interval);
            resolve();
        });
    });
}

async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();
    if (!feed) {
        console.log("No feeds to fetch");
        return;
    }

    console.log("Found a feed to fetch");
    scrapeFeed(feed);
}

async function scrapeFeed(feed: Feed) {
    await markFeedFetched(feed.id);

    const feedData = await fetchFeed(feed.url);

    console.log(
        `Feed data for ${feed.name} collected. ${feedData.channel.item.length} items found.`
    );
}

function handleError(err: unknown) {
    console.error(
        `Error scraping feeds: ${err instanceof Error ? err.message : err}`
    );
}
