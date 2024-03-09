import { config } from "dotenv";
config();

import Fastify, { FastifyInstance } from "fastify";
import "reflect-metadata";
import Container from "typedi";
import { App } from "./app";

const server: FastifyInstance = Fastify({});

if (process.env.DEBUG) console.log("[+] DEBUG");

Container.get(App).start(server);
