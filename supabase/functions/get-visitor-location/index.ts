import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (request) => {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!forwarded) {
    return new Response(JSON.stringify({ city: null, country: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(`https://ipapi.co/${forwarded}/json/`);
  const payload = await response.json();

  return new Response(
    JSON.stringify({
      city: payload.city ?? null,
      country: payload.country_name ?? payload.country ?? null,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
