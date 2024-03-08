/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { Routes } from "./routes";
import { Injectable } from "./types";

@Injectable()
export class App {
  constructor(private routes: Routes) {}

  async start(server: FastifyInstance) {
    this.registerErrorHandler(server);
    this.registerParser(server);
    this.routes.registerRoutes(server);
    try {
      const PORT = process.env.PORT || 9999;
      await server.listen({ port: Number(PORT) });
      const address = server.server.address();
      const port = typeof address === "string" ? address : address?.port;
      console.log(`Running on port ${port}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }

  private registerErrorHandler(server: FastifyInstance) {
    server.setErrorHandler(function (error, _request, reply) {
      if (error.validation) {
        error.statusCode = 422;
        reply.status(422).send(error);
      }
    });
  }

  private registerParser(server: FastifyInstance) {
    server.addContentTypeParser("application/json", { parseAs: "string" }, function (_req, body, done) {
      try {
        const json = JSON.parse(body as string);
        done(null, json);
      } catch (err: any) {
        err.statusCode = 422;
        done(err, undefined);
      }
    });
  }
}
