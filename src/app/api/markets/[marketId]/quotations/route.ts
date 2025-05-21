import { NextRequest, NextResponse } from "next/server";
import { BUDA_API_URL } from "@/config/environment";

type RouteContext = {
  params: {
    marketId: string;
  };
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    console.log("Request body:", body);

    const response = await fetch(
      `${BUDA_API_URL}/markets/${context.params.marketId}/quotations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("Buda API response:", data);

    if (!response.ok) {
      console.error("Buda API error:", data);
      return NextResponse.json(
        { error: `Error fetching quotation: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in quotations API:", error);
    return NextResponse.json(
      { error: "Error fetching quotation" },
      { status: 500 }
    );
  }
}
