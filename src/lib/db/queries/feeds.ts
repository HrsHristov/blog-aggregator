import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
    const [result] = await db
        .insert(feeds)
        .values({ name, url, userId })
        .returning();

    return result;
}

export async function getAllFeeds() {
    const results = await db.select().from(feeds);
    return results;
}
