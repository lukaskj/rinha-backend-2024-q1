import { FastifyInstance, FastifyRequest } from "fastify";
import { ClientIdParam, TransactionRequest, TransactionRequestSchema } from "./dto/transactions-request.dto";
import * as clientService from "./services/client-service";

export function registerRoutes(server: FastifyInstance) {
  type TClienteParams = { id: number };
  server.post(
    "/clientes/:id/transacoes",
    { schema: { body: TransactionRequestSchema, params: ClientIdParam } },
    async (request: FastifyRequest<{ Body: TransactionRequest; Params: TClienteParams }>, _reply) => {
      const params = request.params;
      const body = request.body;
      return clientService.addTransaction(params.id, body);
    },
  );

  server.get(
    "/clientes/:id/extrato",
    { schema: { params: ClientIdParam } },
    async (request: FastifyRequest<{ Params: TClienteParams }>, _reply) => {
      return clientService.statement(request.params.id);
    },
  );
}
