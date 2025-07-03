import { readConfig, setUser } from "../config";
import {
    createUser,
    getAllUsers,
    getUserByName,
} from "../lib/db/queries/users";

export const loginHandler = async (cmdName: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error(
            `No username provided for login command. Usage: ${cmdName}<username>`
        );
    }
    const username = args[0];
    const existingUser = await getUserByName(username);
    if (!existingUser) {
        throw new Error(
            `User ${existingUser} does not exist. Please register first.`
        );
    }
    setUser(existingUser.name);
    console.log(`User ${existingUser.name} logged in successfully.`);
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

export const getUsersHandler = async (_: string) => {
    const result = await getAllUsers();
    const config = readConfig();
    result.forEach((user) => {
        if (user.name === config.currentUserName) {
            console.log(`* ${user.name} (current)`);
            return;
        } else {
            console.log(`* ${user.name}`);
        }
    });
};
