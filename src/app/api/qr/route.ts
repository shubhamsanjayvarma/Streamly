import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const data = searchParams.get("data") || "upi://pay?pa=streamly@bank&am=100";

  // Return SVG QR response
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" fill="#ffffff" rx="12"/>
    <g fill="#07060B">
      <!-- Outer Finder 1 (Top Left) -->
      <rect x="20" y="20" width="45" height="45" rx="6"/>
      <rect x="26" y="26" width="33" height="33" fill="#ffffff" rx="3"/>
      <rect x="32" y="32" width="21" height="21" rx="2"/>

      <!-- Outer Finder 2 (Top Right) -->
      <rect x="135" y="20" width="45" height="45" rx="6"/>
      <rect x="141" y="26" width="33" height="33" fill="#ffffff" rx="3"/>
      <rect x="147" y="32" width="21" height="21" rx="2"/>

      <!-- Outer Finder 3 (Bottom Left) -->
      <rect x="20" y="135" width="45" height="45" rx="6"/>
      <rect x="26" y="141" width="33" height="33" fill="#ffffff" rx="3"/>
      <rect x="32" y="147" width="21" height="21" rx="2"/>

      <!-- Center Data Modules -->
      <rect x="75" y="25" width="10" height="20"/>
      <rect x="95" y="20" width="25" height="10"/>
      <rect x="75" y="55" width="15" height="15"/>
      <rect x="100" y="45" width="20" height="20"/>
      <rect x="80" y="80" width="40" height="40" rx="4" fill="#6D3DF5"/>
      <rect x="20" y="75" width="15" height="25"/>
      <rect x="45" y="85" width="20" height="10"/>
      <rect x="135" y="75" width="20" height="15"/>
      <rect x="165" y="85" width="15" height="30"/>
      <rect x="75" y="130" width="15" height="25"/>
      <rect x="100" y="140" width="20" height="20"/>
      <rect x="130" y="135" width="25" height="15"/>
      <rect x="165" y="135" width="15" height="45"/>
    </g>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
