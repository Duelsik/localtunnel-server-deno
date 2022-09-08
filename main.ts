import { Command } from "./import.ts";
import "./lib/mod.ts";

await new Command()
  .name("localtunnel-server")
  .usage("--port [num]")
  .description(`
    A rewrite of https://github.com/localtunnel/server.
    localtunnel exposes your localhost to the world for easy testing and sharing!
    No need to mess with DNS or deploy just to have others test out your changes.
  `)
  .version("v0.0.1")
  .option("-p, --port <port:number>", "The port number for the server.", {
    default: 80,
  })
  .option(
    "--address <address:string>",
    "The address for the server.",
    {
      default: "0.0.0.0",
    },
  )
  .option("-s, --secure [secure:boolean]", "Use https as protocol in URLs.", {
    default: false,
  })
  .option(
    "-d, --domain <domain:string>",
    `
    Specify the base domain name.
    This is optional if hosting localtunnel from a regular example.com domain.
    This is required if hosting a localtunnel server from a subdomain (i.e. lt.example.dom where clients will be client-app.lt.example.come)
    `.replaceAll(/\n?^(\W)*/gm, " "),
    {
      default: "",
    },
  )
  .option(
    "-m, --max-sockets <maxSockets:number>",
    "maximum number of tcp sockets each client is allowed to establish at one time (the tunnels)",
    {
      default: 10
    },
  )
  .action(async ({ port, address, domain, maxSockets, secure }) => {
  })
  .parse(Deno.args);
