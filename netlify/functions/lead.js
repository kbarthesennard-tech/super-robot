// netlify/functions/lead.js

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Préflight CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  try {
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (!appsScriptUrl) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ ok: false, error: "Missing APPS_SCRIPT_URL env var" }),
      };
    }

    // body arrive en string
    const payload = event.body ? JSON.parse(event.body) : {};

    const upstreamResp = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const upstreamText = await upstreamResp.text();
    let upstreamJson = null;
    try { upstreamJson = JSON.parse(upstreamText); } catch (e) {}

    // On considère OK uniquement si HTTP 2xx ET upstreamJson.ok === true
    const ok = upstreamResp.ok && upstreamJson && upstreamJson.ok === true;

    return {
      statusCode: ok ? 200 : 502,
      headers,
      body: JSON.stringify({
        ok,
        upstreamStatus: upstreamResp.status,
        upstream: upstreamJson ?? upstreamText,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: String(err) }),
    };
  }
};
