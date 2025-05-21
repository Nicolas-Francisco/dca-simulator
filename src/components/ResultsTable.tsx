"use client";

interface MonthlyResult {
  date: string;
  investedAmount: number;
  currentValue: number;
  profit: number;
  profitPercentage: number;
}

interface ResultsTableProps {
  results: MonthlyResult[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inversión
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor Actual
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ganancia/Pérdida
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${result.investedAmount.toLocaleString("es-CL")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${result.currentValue.toLocaleString("es-CL")}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm ${
                  result.profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${result.profit.toLocaleString("es-CL")}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm ${
                  result.profitPercentage >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {result.profitPercentage.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
