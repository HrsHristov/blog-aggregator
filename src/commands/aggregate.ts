import { fetchFeed } from "../lib/rss";

export const aggrHandler = async (_: string) => {
    const feedUrl = "https://www.wagslane.dev/index.xml";

    const feedData = await fetchFeed(feedUrl);
    const feedDataString = JSON.stringify(feedData, null, 2);
    console.log(feedDataString);
};
