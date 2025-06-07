import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export const fetchFeed = async (feedURL: string) => {
    const response = await fetch(feedURL, {
        headers: {
            "Content-Type": "application/xml",
            "User-Agent": "gator",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }

    const feedData = await response.text();
    const parser = new XMLParser();
    const data = parser.parse(feedData);

    const channel = data.rss?.channel;
    if (!channel) {
        throw new Error("Invalid feed format");
    }

    if (!channel || !channel.title || !channel.link || !channel.description) {
        throw new Error("Missing required channel fields");
    }

    const items = Array.isArray(channel.item) ? channel.item : [channel.item];
    const rssItems: RSSItem[] = [];

    for (const item of items) {
        if (!item.title || !item.link || !item.pubDate) {
            continue; // Skip invalid items
        }

        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
        });
    }

    const rssFeed: RSSFeed = {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: rssItems,
        },
    };

    return rssFeed;
};
