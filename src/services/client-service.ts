import { Service } from "typedi";
import { LimitBalanceResponse } from "../dto/limit-balance-response.dto";
import { TransactionRequest } from "../dto/transactions-request.dto";

@Service()
export class ClientService {
  constructor() {}

  public async addTransaction(id: number, transactionData: TransactionRequest): Promise<LimitBalanceResponse> {
    console.log("id", id, transactionData);
    return {
      limite: 100,
      saldo: 10,
    };
  }

  public statement(id: number) {
    return id;
  }
}
