import { eq, sql } from "drizzle-orm";
import { Service } from "typedi";
import { databaseService } from "../database";
import { clients, transactions } from "../database/schema";
import { LimitBalanceResponse } from "../dto/limit-balance-response.dto";
import { TransactionRequest } from "../dto/transactions-request.dto";
import { HttpException } from "../utils/http";
import { TransactionTypeEnum } from "../enum/transaction-type.enum";

@Service()
export class ClientService {
  constructor() {}

  public async addTransaction(id: number, transactionData: TransactionRequest): Promise<LimitBalanceResponse> {
    if (id > 5 || id <= 0) {
      throw new HttpException(404); // =)
    }
    const client = await databaseService.query.clients.findFirst({ where: eq(clients.id, id) });

    if (client === undefined) {
      throw new HttpException(404);
    }

    const balances = await databaseService
      .select({
        clientId: transactions.clientId,
        balance: sql<number>`sum(${transactions.amount} * ${transactions.type})`.mapWith(Number),
      })
      .from(transactions)
      .where(eq(transactions.clientId, id))
      .groupBy(transactions.clientId);

    let balance = {
      clientId: id,
      balance: 0,
    };

    if (balances.length > 0) {
      balance = balances[0];
    }

    const transactionType = Number(TransactionTypeEnum[transactionData.tipo]);

    if (transactionType === -1 && balance.balance - transactionData.valor < -client.limit) {
      throw new HttpException(422, "Transação ultrapassa o limite disponível.");
    }

    await databaseService.insert(transactions).values({
      amount: transactionData.valor,
      clientId: id,
      description: transactionData.descricao,
      type: transactionType,
    });

    return {
      limite: client.limit,
      saldo: balance.balance + transactionData.valor * transactionType,
    };
  }

  public statement(id: number) {
    return id;
  }
}
