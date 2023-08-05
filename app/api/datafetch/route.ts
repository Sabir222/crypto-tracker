// import { NextResponse } from "next/server";

// const apiEndpoint =
//   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
// const apiKey = "c46ba785-7ffd-492e-b554-bd9c302dfad9";
// const headers = {
//   "X-CMC_PRO_API_KEY": apiKey,
// };

// export async function GET() {
//   const response = await fetch(apiEndpoint, {
//     headers: headers,

//     next: {
//       revalidate: 305,
//     },
//   });

//   const data = await response.json();

//   return NextResponse.json({ data });
// }
