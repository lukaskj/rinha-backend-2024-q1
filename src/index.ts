import { config } from "dotenv";
config();

import Fastify, { FastifyInstance } from "fastify";
import "reflect-metadata";
import { start } from "./app";

const server: FastifyInstance = Fastify({});

if (process.env.DEBUG) console.log("[+] DEBUG");

start(server);
