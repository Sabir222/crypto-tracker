import { NextResponse } from "next/server";

const apiEndpoint =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const apiKey = "c46ba785-7ffd-492e-b554-bd9c302dfad9";
const headers = {
  "X-CMC_PRO_API_KEY": apiKey,
};
export async function GET(request: any) {
  try {
    const response = await fetch(apiEndpoint, {
      headers: headers,
      next: {
        revalidate: 20,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    // return data.data;
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
