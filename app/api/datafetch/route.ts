import { NextResponse } from "next/server";

const apiEndpoint =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const apiKey = process.env.CMC_PRO_API_KEY;
if (!apiKey) {
  throw new Error("CMC_PRO_API_KEY is not defined in your environment");
}
const headers = {
  "X-CMC_PRO_API_KEY": apiKey,
};
export async function GET(request: any) {
  try {
    const response = await fetch(apiEndpoint, {
      headers: headers,
      // cache: "no-cache",
      next: {
        revalidate: 3600,
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
