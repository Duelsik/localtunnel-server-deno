import { ServerType } from "./setupServer.ts";
// Doing that very lowlevel because I expect to require flexibility
export const handleServer = async (server: ServerType, listener: Deno.Listener) => {
  for await (const conn of listener) {
    serveHttp(conn);
  }
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get("user-agent") ?? "Unknown"
    }`;
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );
  }
}
