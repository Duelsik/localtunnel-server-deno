export { serve } from "https://deno.land/std@0.154.0/http/server.ts";
export { Command } from "https://deno.land/x/cliffy@v0.25.0/command/mod.ts";
import { Logger } from "https://deno.land/x/log@v0.6.1/mod.ts";
import * as log from "https://deno.land/std@0.154.0/log/mod.ts";

type LoggerType = typeof log & {
  prefix: (prefix: string) => LoggerType
};
const minLevelForConsole = "DEBUG";
const minLevelForFile = "WARNING";
const fileName = "./logs.txt"
export const defaultLogger: LoggerType = await (Logger.getInstance(
  minLevelForConsole,
  minLevelForFile,
  fileName
) as Promise<LoggerType>);
defaultLogger.prefix = function (prefix) {
  // `this` in this context is logger that is callee
  return {
    ...this,
    critical: (...args) => this.critical(prefix + args[0], ...args.splice(0, -1)),
    debug: (...args) => this.debug(prefix + args[0], ...args.splice(0, -1)),
    info: (...args) => this.info(prefix + args[0], ...args.splice(0, -1)),
    error: (...args) => this.error(prefix + args[0], ...args.splice(0, -1)),
    warning: (...args) => this.error(prefix + args[0], ...args.splice(0, -1))
  };
};
