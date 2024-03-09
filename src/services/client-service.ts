import { desc, eq, sql } from "drizzle-orm";
import { databaseService } from "../database";
import { Client, clients, transactions } from "../database/schema";
import { LimitBalanceResponse } from "../dto/limit-balance-response.dto";
import { Statement } from "../dto/statement.sto";
import { Transaction } from "../dto/transaction.dto";
import { TransactionRequest } from "../dto/transactions-request.dto";
import { TransactionTypeEnum } from "../enum/transaction-type.enum";
import { HttpException } from "../utils/http";

type TBalance = {
  clientId: number;
  balance: number;
};

export async function _getBalance(id: number): Promise<TBalance> {
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

  return balance;
}

export async function getClient(clientId: number): Promise<Client> {
  if (clientId > 5 || clientId <= 0) {
    throw new HttpException(404); // =)
  }
  const client = await databaseService.query.clients.findFirst({ where: eq(clients.id, clientId) });

  if (client === undefined) {
    throw new HttpException(404);
  }
  return client;
}

export async function addTransaction(
  clientId: number,
  transactionData: TransactionRequest,
): Promise<LimitBalanceResponse> {
  const client = await getClient(clientId);

  const transactionType = Number(TransactionTypeEnum[transactionData.tipo]);

  const newBalance = client.balance + transactionData.valor * transactionType;

  if (transactionType === -1 && newBalance < -client.limit) {
    throw new HttpException(422, "Transação ultrapassa o limite disponível.");
  }

  await databaseService.transaction(
    async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(${clientId})`);

      const updateClientBalance = tx
        .update(clients)
        .set({
          balance: newBalance,
        })
        .where(eq(clients.id, clientId));

      const insertTransaction = tx.insert(transactions).values({
        amount: transactionData.valor,
        clientId: client.id,
        description: transactionData.descricao,
        type: transactionType,
      });

      await Promise.all([insertTransaction, updateClientBalance]);
    },
    {
      isolationLevel: "read committed",
      accessMode: "read write",
    },
  );

  return {
    limite: client.limit,
    saldo: newBalance,
  };
}

export async function statement(clientId: number): Promise<Statement> {
  const client = await getClient(clientId);

  const transactionList = await lastTransactions(clientId);

  return {
    saldo: {
      data_extrato: new Date(),
      limite: client.limit,
      total: client.balance,
    },
    ultimas_transacoes: transactionList,
  };
}

export async function lastTransactions(clientId: number): Promise<Transaction[]> {
  const list = await databaseService
    .select()
    .from(transactions)
    .where(eq(transactions.clientId, clientId))
    .orderBy(desc(transactions.id))
    .limit(10);

  return list.map((tt) => ({
    tipo: tt.type === 1 ? "c" : "d",
    valor: tt.amount,
    descricao: tt.description,
    realizada_em: tt.createdAt as Date,
  }));
}
