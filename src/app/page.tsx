"use client";

import { useState, useEffect } from "react";
import { getMarkets } from "../services/markets";
import { getQuotation } from "../services/quotations";
import { Market } from "@/interfaces/market";
import { Quotation } from "@/interfaces/quotation";
import { QuotationResult } from "@/components/QuotationResult";

export default function Home() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string>("btc-clp");
  const [loading, setLoading] = useState<boolean>(true);
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [quotationLoading, setQuotationLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketData = await getMarkets();
        setMarkets(marketData);
      } catch (error) {
        console.error("Error fetching markets:", error);
        setError("Error al cargar los mercados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSimulatePurchase = async () => {
    setQuotationLoading(true);
    setError(null);
    try {
      const response = await getQuotation(selectedMarket, {
        type: "bid_given_size",
        amount: 1,
      });
      setQuotation(response.quotation);
    } catch (error) {
      console.error("Error simulating purchase:", error);
      setError("Error al simular la compra");
    } finally {
      setQuotationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando mercados disponibles...</div>
      </div>
    );
  }

  const selectedMarketData = markets.find((m) => m.id === selectedMarket);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulador de Compra
          </h1>
          <p className="text-gray-600">
            Simula la compra de 1 unidad en el mercado seleccionado
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label
                htmlFor="market-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Selecciona un mercado
              </label>
              <select
                id="market-select"
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                {markets.map((market) => (
                  <option key={market.id} value={market.id} className="py-2">
                    {market.name} ({market.base_currency}/
                    {market.quote_currency})
                  </option>
                ))}
              </select>
            </div>

            {selectedMarketData && (
              <div className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium mb-1">Comisiones del mercado:</p>
                <p>
                  Comisión Taker:{" "}
                  {parseFloat(selectedMarketData.taker_fee) * 100}%
                </p>
                <p>
                  Comisión Maker:{" "}
                  {parseFloat(selectedMarketData.maker_fee) * 100}%
                </p>
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleSimulatePurchase}
                disabled={quotationLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {quotationLoading
                  ? "Simulando compra..."
                  : `Simular compra de 1 ${
                      selectedMarketData?.base_currency || ""
                    }`}
              </button>

              {error && <div className="text-red-500 mt-2">{error}</div>}

              {quotation && <QuotationResult quotation={quotation} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
