import { QuotationResponse, QuotationType } from "@/interfaces/quotation";

interface QuotationRequest {
  type: QuotationType;
  amount: number;
  limit?: number;
}

export const getQuotation = async (
  marketId: string,
  request: QuotationRequest
): Promise<QuotationResponse> => {
  try {
    const response = await fetch(`/api/markets/${marketId}/quotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error fetching quotation: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching quotation:", error);
    throw error;
  }
};
