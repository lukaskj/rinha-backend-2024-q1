import Fastify, { FastifyInstance } from "fastify";
import "reflect-metadata";
import Container from "typedi";
import { App } from "./app";
import { config } from "dotenv";
config();

const server: FastifyInstance = Fastify({});

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: "object",
//         properties: {
//           pong: {
//             type: "string",
//           },
//         },
//       },
//     },
//   },
// };

Container.get(App).start(server);
