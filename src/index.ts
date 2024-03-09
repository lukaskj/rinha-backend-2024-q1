import { config } from "dotenv";
config();

import Fastify, { FastifyInstance } from "fastify";
import "reflect-metadata";
import Container from "typedi";
import { App } from "./app";
import { pool } from "./database";

const server: FastifyInstance = Fastify({});

if (process.env.DEBUG) console.log("[+] DEBUG");

const signals = [
  "SIGABRT",
  "SIGALRM",
  "SIGBUS",
  "SIGCHLD",
  "SIGCONT",
  "SIGFPE",
  "SIGHUP",
  "SIGILL",
  "SIGINT",
  "SIGIO",
  "SIGIOT",
  "SIGKILL",
  "SIGPIPE",
  "SIGPOLL",
  "SIGPROF",
  "SIGPWR",
  "SIGQUIT",
  "SIGSEGV",
  "SIGSTKFLT",
  "SIGSTOP",
  "SIGSYS",
  "SIGTERM",
  "SIGTRAP",
  "SIGTSTP",
  "SIGTTIN",
  "SIGTTOU",
  "SIGUNUSED",
  "SIGURG",
  "SIGUSR1",
  "SIGUSR2",
  "SIGVTALRM",
  "SIGWINCH",
  "SIGXCPU",
  "SIGXFSZ",
  "SIGBREAK",
  "SIGLOST",
  "SIGINFO",
];

signals.forEach((i) => process.on(i, onExit));

Container.get(App).start(server);

async function onExit() {
  await pool.end();
}
