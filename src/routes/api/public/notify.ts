import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const RECIPIENT = "ibsenrubayita@gmail.com";

const Schema = z.object({
  kind: z.string().min(1).max(64),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email().max(200).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(10000),
  meta: z.record(z.string().max(64), z.any()).optional(),
});

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

export const Route = createFileRoute("/api/public/notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        if (!LOVABLE_API_KEY) return new Response("LOVABLE_API_KEY missing", { status: 500 });
        if (!RESEND_API_KEY) return new Response("RESEND_API_KEY missing", { status: 500 });

        let body: unknown;
        try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) return new Response(JSON.stringify(parsed.error.flatten()), { status: 400 });
        const { kind, name, email, subject, message, meta } = parsed.data;

        const html = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;color:#111">
            <h2 style="margin:0 0 12px">New ArtSpace ${esc(kind)} submission</h2>
            <p style="margin:0 0 8px"><strong>Subject:</strong> ${esc(subject)}</p>
            ${name ? `<p style="margin:0 0 8px"><strong>Name:</strong> ${esc(name)}</p>` : ""}
            ${email ? `<p style="margin:0 0 8px"><strong>Email:</strong> ${esc(email)}</p>` : ""}
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
            <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px">${esc(message)}</pre>
            ${meta ? `<hr style="border:none;border-top:1px solid #eee;margin:16px 0" /><pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:12px;color:#555">${esc(JSON.stringify(meta, null, 2))}</pre>` : ""}
          </div>`;

        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": RESEND_API_KEY,
          },
          body: JSON.stringify({
            from: "ArtSpace <onboarding@resend.dev>",
            to: [RECIPIENT],
            reply_to: email,
            subject: `[ArtSpace · ${kind}] ${subject}`,
            html,
          }),
        });

        if (!res.ok) {
          const t = await res.text();
          return new Response(`Resend error ${res.status}: ${t}`, { status: 502 });
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
