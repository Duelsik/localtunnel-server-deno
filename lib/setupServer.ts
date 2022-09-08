import { defaultLogger } from "../dependencies.ts";
import type { CommandArgs } from "./command.ts";

const logger = defaultLogger.prefix("localtunnel:server ");

export const setupServer = ({ port, address, domain, maxSockets, secure } : CommandArgs) => {
  
};

export type ServerType = ReturnType<typeof setupServer>;
