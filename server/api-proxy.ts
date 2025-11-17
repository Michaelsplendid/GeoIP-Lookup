// Edge Runtime serverless function (Vercel) that proxies requests to ipstack via APILayer
export const config = {
  runtime: "edge",
};

export default async function handler(request: Request): Promise<Response> {
  try {
    const APILAYER_KEY = process.env.APILAYER_KEY;

    if (!APILAYER_KEY) {
      return new Response(
        JSON.stringify({ error: "APILAYER_KEY is not set in environment variables" }),
        { status: 500 }
      );
    }

    const urlObj = new URL(request.url);
    const ip = urlObj.searchParams.get("ip") || "check"; // default: detect caller IP

    const targetUrl =
      `https://api.ipstack.com/${encodeURIComponent(ip)}?access_key=${encodeURIComponent(APILAYER_KEY)}`;

    const apiRes = await fetch(targetUrl, { method: "GET" });
    const data = await apiRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "proxy error" }),
      { status: 500 }
    );
  }
}