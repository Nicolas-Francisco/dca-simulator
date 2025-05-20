export interface Market {
  id: string;
  name: string;
  base_currency: string;
  quote_currency: string;
  minimum_order_amount: [string, string];
  taker_fee: string;
  maker_fee: string;
  max_orders_per_minute: number;
  maker_discount_percentage: string;
  taker_discount_percentage: string;
  maker_discount_tiers: {
    "*": number;
  };
  taker_discount_tiers: {
    "*": number;
    [key: string]: number;
  };
}
