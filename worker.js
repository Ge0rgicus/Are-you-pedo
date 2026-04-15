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
      const incoming = await request.formData();
      const photo = incoming.get("photo");

      // Convert image to base64
      const arrayBuffer = await photo.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      const mediaType = photo.type || "image/jpeg";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_ANTHROPIC_API_KEY",
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 256,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64 }
              },
              {
                type: "text",
                text: "Analyze this image and detect all human faces. For each face, estimate the age. Respond ONLY with valid JSON in this exact format, no other text: {\"faces\": [{\"age\": 25, \"gender\": \"Male\"}, {\"age\": 32, \"gender\": \"Female\"}]}. If no faces are detected, respond with: {\"faces\": []}"
              }
            ]
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || '{"faces":[]}';

      return new Response(text, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message, faces: [] }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }
  }
}
