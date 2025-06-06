import { deleteAllUsers } from "../lib/db/queries/users";

export const resetHandler = async (cmdName: string, ...args: string[]) => {
    await deleteAllUsers();

    console.log("All users have been deleted successfully.");
};
