import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/draft")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const enabled = !(request.headers.get("cookie") ?? "")
          .split(";")
          .some((cookie) => cookie.trim() === "draft=1");
        return new Response(JSON.stringify({ enabled }), {
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `draft=${enabled ? "1" : "0"}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${enabled ? 86400 : 0}`,
          },
        });
      },
    },
  },
});
