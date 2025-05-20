import { Market } from "@/interfaces/market";
// import { format, subMonths } from "date-fns";

interface MarketResponse {
  markets: Market[];
}

export async function getMarkets(): Promise<Market[]> {
  try {
    const response = await fetch("/api/markets");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MarketResponse = await response.json();
    return data.markets;
  } catch (error) {
    console.error(`Error fetching markets:`, error);
    return [];
  }
}
