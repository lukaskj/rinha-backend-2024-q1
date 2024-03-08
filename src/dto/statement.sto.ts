import { Balance } from "./balance.dto";
import { Transaction } from "./transaction.dto";

export class Statement {
  saldo: Balance;
  ultimas_transacoes: Transaction[];
}
