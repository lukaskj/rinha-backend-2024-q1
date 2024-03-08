import { FastifyInstance, FastifyRequest } from "fastify";
import { TransactionRequest, TransactionRequestSchema } from "./dto/transactions-request.dto";
import { ClientService } from "./services/client-service";
import { Injectable } from "./types";

@Injectable()
export class Routes {
  constructor(private clientController: ClientService) {}
  public registerRoutes(server: FastifyInstance) {
    type TClienteParams = { id: number };
    server.post(
      "/clientes/:id/transacoes",
      { schema: { body: TransactionRequestSchema } },
      async (request: FastifyRequest<{ Body: TransactionRequest; Params: TClienteParams }>, _reply) => {
        const params = request.params;
        const body = request.body;
        return this.clientController.addTransaction(params.id, body);
      },
    );

    server.get("/clientes/:id/extrato", async (request: FastifyRequest<{ Params: TClienteParams }>, _reply) => {
      return this.clientController.statement(request.params.id);
    });
  }
}
