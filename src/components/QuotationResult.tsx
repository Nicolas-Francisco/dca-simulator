import { Quotation } from "@/interfaces/quotation";

interface QuotationResultProps {
  quotation: Quotation;
}

export const QuotationResult = ({ quotation }: QuotationResultProps) => {
  const formatCurrencyAmount = (amount: [string, string]) => {
    const [value, currency] = amount;
    const numAmount = parseFloat(value);
    if (isNaN(numAmount)) return "N/A";
    return `${numAmount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Resultado de la Cotización</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Monto a Comprar
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrencyAmount(quotation.amount)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Costo Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrencyAmount(quotation.quote_exchanged)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Comisión
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrencyAmount(quotation.fee)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Balance Final
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrencyAmount(quotation.base_balance_change)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
