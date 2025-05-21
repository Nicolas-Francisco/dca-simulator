"use client";

import { useState } from "react";

interface InvestmentFormProps {
  onSubmit: (amount: number) => void;
}

export default function InvestmentForm({ onSubmit }: InvestmentFormProps) {
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onSubmit(numericAmount);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Monto mensual a invertir (CLP)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa el monto en pesos"
          min="0"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Simular inversión
      </button>
    </form>
  );
}
