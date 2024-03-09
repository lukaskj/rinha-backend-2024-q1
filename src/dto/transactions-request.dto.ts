import { TransactionTypeEnum } from "../enum/transaction-type.enum";
import S from "fluent-json-schema";

export class TransactionRequest {
  valor: number;

  tipo: TransactionTypeEnum;

  descricao: string;
}
export const TransactionRequestSchema = S.object()
  .prop("valor", S.number().minimum(0).required())
  .prop("tipo", S.string().enum(Object.values(TransactionTypeEnum)).required())
  .prop("descricao", S.string().minLength(1).maxLength(10).required());

export class TransctionResponse {
  limite: number;
  saldo: number;
}
