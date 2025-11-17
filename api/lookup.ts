export const config = {
  runtime: "edge",
};

export default async function handler(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const ip = url.searchParams.get("ip");
    const key = process.env.IPSTACK_KEY;

    // Check if IPSTACK_KEY is available
    if (!key) {
      return new Response(
        JSON.stringify({ error: "Missing IPSTACK_KEY in environment variables" }),
        { status: 500 }
      );
    }

    // Check if the 'ip' query parameter is provided
    if (!ip) {
      return new Response(
        JSON.stringify({ error: "Missing ?ip= parameter" }),
        { status: 400 }
      );
    }

    // Use https instead of http for the IPStack API URL
    const apiUrl = `https://api.ipstack.com/${ip}?access_key=${key}`;

    // Fetch data from the ipstack API
    const result = await fetch(apiUrl);
    const data = await result.json();

    // Log the response to inspect it
    console.log('IPStack Response:', JSON.stringify(data));

    // Handle errors from IPStack API response
    if (data.error) {
      console.error('IPStack Error:', data.error);
      return new Response(
        JSON.stringify({ error: `Failed to fetch IP data: ${data.error.info}` }),
        { status: 500 }
      );
    }

    // Return the geolocation data
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    // Log any errors that occur during the fetching process
    console.error('Error fetching IP data:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}