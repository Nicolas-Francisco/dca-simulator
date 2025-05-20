import { NextResponse } from "next/server";
import { API_URL } from "@/config/enviroment";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/markets`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Error fetching markets" },
      { status: 500 }
    );
  }
}
