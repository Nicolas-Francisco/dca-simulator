type CurrencyAmount = [string, string];

export interface Quotation {
  amount: CurrencyAmount;
  base_balance_change: CurrencyAmount;
  base_exchanged: CurrencyAmount;
  fee: CurrencyAmount;
  incomplete: boolean;
  limit: CurrencyAmount | null;
  order_amount: CurrencyAmount;
  quote_balance_change: CurrencyAmount;
  quote_exchanged: CurrencyAmount;
  type:
    | "bid_given_size"
    | "bid_given_value"
    | "ask_given_size"
    | "ask_given_value";
}

export interface QuotationResponse {
  quotation: Quotation;
}

export type QuotationType =
  | "bid_given_size"
  | "bid_given_value"
  | "ask_given_size"
  | "ask_given_value";
