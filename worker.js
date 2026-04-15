export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        }
      });
    }

    try {
      const body = await request.formData();

      const res = await fetch("https://api.luxand.cloud/photo/detect", {
        method: "POST",
        headers: { token: "f763ae5df7c6453da7e27b2ded7713ba" },
        body
      });

      const text = await res.text();

      if (!text || text.trim() === "") {
        return new Response(JSON.stringify({ error: "Empty response from Luxand API" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        });
      }

      return new Response(text, {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }
  }
}
