import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  const isAssetRequest =
    url.pathname.startsWith("/ph/static/") ||
    url.pathname.startsWith("/ph/array/") ||
    url.pathname.endsWith(".js");

  const posthogHost = isAssetRequest
    ? "https://us-assets.i.posthog.com"
    : "https://us.i.posthog.com";

  const proxiedPath = url.pathname.replace(/^\/ph/, "") || "/";
  const targetUrl = new URL(proxiedPath + url.search, posthogHost);

  const headers = new Headers(request.headers);
  headers.set("host", new URL(posthogHost).hostname);

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
  });
};

export const config = { path: "/ph/*" };
