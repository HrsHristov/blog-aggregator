import type { CommandHandler } from "./commands/commamds";

export function middlewareLoggedIn(handler: CommandHandler): CommandHandler {}
