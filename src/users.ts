import { setUser } from "./config";

export const loginHandler = (cmdName: string, ...args: string[]) => {
    if (args.length === 0) {
        throw new Error(
            `No username provided for login command. Usage: ${cmdName}<username>`
        );
    }
    const username = args[0];
    setUser(username);
    console.log(`User ${username} logged in successfully.`);
};
