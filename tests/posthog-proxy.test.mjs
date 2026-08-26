import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import posthogProxy from "../netlify/edge-functions/posthog-proxy.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("rejects a protocol-relative root path", async () => {
  globalThis.fetch = () => {
    throw new Error("fetch must not be called for an invalid target origin");
  };

  const response = await posthogProxy(
    new Request("https://bwadvisorysolutions.com.au/ph//example.com/"),
    {},
  );

  assert.equal(response.status, 400);
  assert.equal(await response.text(), "Bad request");
});

test("keeps an encoded double slash on the PostHog origin", async () => {
  let target;
  globalThis.fetch = (input) => {
    target = new URL(input);
    return Promise.resolve(new Response(null, { status: 204 }));
  };

  const response = await posthogProxy(
    new Request("https://bwadvisorysolutions.com.au/ph/%2f%2fexample.com/"),
    {},
  );

  assert.equal(response.status, 204);
  assert.equal(target.origin, "https://us.i.posthog.com");
  assert.equal(target.pathname.toLowerCase(), "/%2f%2fexample.com/");
});

test("continues to proxy a valid PostHog ingest request", async () => {
  let target;
  globalThis.fetch = (input) => {
    target = new URL(input);
    return Promise.resolve(new Response(null, { status: 204 }));
  };

  const response = await posthogProxy(
    new Request("https://bwadvisorysolutions.com.au/ph/e/"),
    {},
  );

  assert.equal(response.status, 204);
  assert.equal(target.href, "https://us.i.posthog.com/e/");
});

test("continues to proxy a valid PostHog asset request", async () => {
  let target;
  globalThis.fetch = (input) => {
    target = new URL(input);
    return Promise.resolve(new Response(null, { status: 204 }));
  };

  const response = await posthogProxy(
    new Request("https://bwadvisorysolutions.com.au/ph/static/array.js"),
    {},
  );

  assert.equal(response.status, 204);
  assert.equal(target.href, "https://us-assets.i.posthog.com/static/array.js");
});
