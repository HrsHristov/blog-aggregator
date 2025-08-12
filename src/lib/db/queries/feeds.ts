import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createFeed(name: string, url: string, userId: string) {
    const result = await db
        .insert(feeds)
        .values({ name, url, userId })
        .returning();

    return firstOrUndefined(result);
}

export async function getAllFeeds() {
    const result = await db.select().from(feeds);
    return firstOrUndefined(result);
}

export async function getFeedbyUrl(url: string) {
    const result = await db.select().from(feeds).where(eq(feeds.url, url));
    return firstOrUndefined(result);
}

export async function markFeedFetched(feedId: string) {
    const result = await db
        .update(feeds)
        .set({ lastFetchAt: new Date() })
        .where(eq(feeds.id, feedId))
        .returning();

    return firstOrUndefined(result);
}

export async function getNextFeedToFetch() {
    const result = await db
        .select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchAt} desc nulls first`)
        .limit(1);

    return firstOrUndefined(result);
}
