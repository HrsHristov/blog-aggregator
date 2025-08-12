import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
    const result = await db.insert(users).values({ name: name }).returning();
    return firstOrUndefined(result);
}

export async function getUserByName(name: string) {
    const result = await db.select().from(users).where(eq(users.name, name));
    return firstOrUndefined(result);
}

export async function getUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return firstOrUndefined(result);
}

export async function deleteAllUsers() {
    await db.delete(users).execute();
}

export async function getAllUsers() {
    const result = await db.select().from(users);
    return firstOrUndefined(result);
}
