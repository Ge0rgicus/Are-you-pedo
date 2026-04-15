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

      const form = new FormData();
      form.append("api_key", "KRPLmliHXPWoMRB4ZhoRe6DJg5ymyirh");
      form.append("api_secret", "5Ttt7-DciSEyZ89lrU9Z61Ssn68XPAoC");
      form.append("image_file", photo);
      form.append("return_attributes", "age,gender");

      const res = await fetch("https://api-cn.faceplusplus.com/facepp/v3/detect", {
        method: "POST",
        body: form
      });

      const text = await res.text();
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
