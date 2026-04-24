import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (request) => {
  const { email, artist, releaseTitle } = await request.json();

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM") ?? "Kymia Music <noreply@kymiamusic.com>";

  if (!resendApiKey) {
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const html = `
    <div style="background:#08080a;color:#fcfcf9;padding:48px;font-family:Inter,Arial,sans-serif;">
      <p style="letter-spacing:0.4em;text-transform:uppercase;color:#bc2121;font-size:12px;">Kymia Music</p>
      <h1 style="font-family:Georgia,serif;font-style:italic;font-size:44px;margin:24px 0;">Bienvenue dans le cercle.</h1>
      <p style="max-width:560px;line-height:1.7;">Ton inscription pour ${artist} est bien prise en compte. Tu recevras les prochaines activations autour de ${releaseTitle} en priorite.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: `Bienvenue dans le cercle — ${artist}`,
      html,
    }),
  });

  const payload = await response.text();
  return new Response(payload, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
});
