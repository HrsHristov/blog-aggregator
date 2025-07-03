import { User } from "../lib/db/schema";

export type CommandHandler = (
    cmdName: string,
    ...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export const registerCommand = (
    registry: CommandsRegistry,
    cmdName: string,
    handler: CommandHandler
): void => {
    registry[cmdName] = handler;
};

export const runCommand = async (
    registry: CommandsRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> => {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Command ${cmdName} not found.`);
    }
    await handler(cmdName, ...args);
};

export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;