import { get } from "http";
import { setUser } from "./config";
import { createUser, getUserByName } from "./lib/db/queries/users";

export const loginHandler = async (cmdName: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error(
            `No username provided for login command. Usage: ${cmdName}<username>`
        );
    }
    const username = args[0];
    const user = await getUserByName(username);
    // const data = JSON.stringify(user);
    // console.log(`User data retrieved: ${data}`);
    if (!user) {
        throw new Error(
            `User ${username} does not exist. Please register first.`
        );
    }
    setUser(username);
    console.log(`User ${username} logged in successfully.`);
};

export const registerHandler = async (cmdName: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error(
            `No username provided for register command. Usage: ${cmdName}<username>`
        );
    }
    const username = args[0];
    const user = await createUser(username);
    if (!user) {
        throw new Error(`Failed to register user ${username}.`);
    }
    setUser(user.name);
    console.log(`User ${username} registered successfully.`);
};
