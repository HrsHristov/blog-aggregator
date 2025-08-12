import { db } from "..";
import { eq, and } from "drizzle-orm";
import { feeds, feedFollows, users } from "../schema";

export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db
        .insert(feedFollows)
        .values({ userId, feedId })
        .returning();

    const [result] = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            feedName: feeds.name,
            userName: users.name,
        })
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .where(
            and(
                eq(feedFollows.id, newFeedFollow.id),
                eq(feedFollows.userId, userId),
                eq(feedFollows.feedId, feedId)
            )
        );

    return result;
}

export async function getFeedFollowsForUser(userId: string) {
    const result = await db
        .select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            feedName: feeds.name,
        })
        .from(feedFollows)
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .where(eq(feedFollows.userId, userId));

    return result;
}

export async function deleteFeedFollow(userId: string, feedId: string) {
    const [result] = await db
        .delete(feedFollows)
        .where(
            and(eq(feedFollows.feedId, feedId), eq(feedFollows.userId, userId))
        )
        .returning();

    return result;
}
