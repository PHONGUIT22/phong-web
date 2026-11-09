import { NextRequest, NextResponse } from "next/server";

const NOSTR_PUBKEY_HEX =
  "09e4e56ef0cfe8c0e368372b49f1ce325c30198f0b0881b2d3cfdd709049a32b";

const RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.primal.net",
  "wss://nos.lol",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=3600, s-maxage=86400",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.toLowerCase();

  const names: Record<string, string> = {
    _: NOSTR_PUBKEY_HEX,
    phong: NOSTR_PUBKEY_HEX,
    hacphong: NOSTR_PUBKEY_HEX,
  };

  if (name && !names[name]) {
    return NextResponse.json(
      { names: {}, relays: {} },
      {
        status: 404,
        headers: CORS_HEADERS,
      }
    );
  }

  const responseData = {
    names: name ? { [name]: NOSTR_PUBKEY_HEX } : names,
    relays: {
      [NOSTR_PUBKEY_HEX]: RELAYS,
    },
  };

  return NextResponse.json(responseData, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
