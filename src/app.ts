/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from "fastify";
import { registerRoutes } from "./routes";

export async function start(server: FastifyInstance) {
  registerErrorHandler(server);
  registerParser(server);
  registerRoutes(server);
  try {
    const PORT = process.env.PORT || 3000;
    await server.listen({ port: Number(PORT), host: "0.0.0.0" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  } finally {
    // await pool.end();
  }
}

function registerErrorHandler(server: FastifyInstance) {
  server.setErrorHandler(function (error, _request, reply) {
    if (error.validation) {
      error.statusCode = 422;
      reply.status(422).send(error);
      return;
    }
    reply.send(error);
  });
}

function registerParser(server: FastifyInstance) {
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
