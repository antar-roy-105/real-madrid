import { NextResponse } from "next/server";

const SPORTMONKS_TOKEN = "AwiCRK5BoOhMLJkvcEWl1GxX1MCgN1pQGuefvZjW0gbGt8lxppLQmLPbPXXe";
const BASE_URL = "https://api.sportmonks.com/v3/football";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Support optional query params forwarded from the client
  const include = searchParams.get("include") ?? "participants;league;scores;periods;state";

  try {
    const url = `${BASE_URL}/livescores?include=${encodeURIComponent(include)}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: SPORTMONKS_TOKEN,
      },
      // Revalidate every 30 s on the server, matching client refresh cadence
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `SportMonks error ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        // Allow the browser to cache the response briefly
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch live scores", detail: String(err) },
      { status: 500 }
    );
  }
}
