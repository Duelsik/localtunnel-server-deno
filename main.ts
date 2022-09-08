import { defaultLogger } from "./dependencies.ts";
import { setupServer } from "./lib/setupServer.ts";
import { command } from "./lib/command.ts";
import { handleServer } from "./lib/handleServer.ts";

try {
  command
    .action(async ({ port, address, domain, maxSockets, secure }) => {
      const server = setupServer({
        port, address, domain, maxSockets, secure
      });

      const listener = Deno.listen({
        hostname: address,
        port,
        transport: "tcp"
      });

      defaultLogger.debug(`Server listening on port: ${port}`);

      Deno.addSignalListener("SIGINT", () => {
        Deno.exit();
      });

      Deno.addSignalListener("SIGTERM", () => {
        Deno.exit();
      });

      await handleServer(server, listener);
    })
    .parse(Deno.args);
} catch (error) {
  switch (error) {
    default:
      defaultLogger.critical(error);
      Deno.exit();
  }
}
