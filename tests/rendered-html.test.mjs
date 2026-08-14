import assert from "node:assert/strict";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders both redirector routes", async () => {
  const [home, redirect] = await Promise.all([render(), render("/redirect?target=codex%3A%2F%2Fitem")]);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Make any URL/);
  assert.equal(redirect.status, 200);
  assert.match(await redirect.text(), /No destination|Opening your link/);
  assert.equal(templateRoot.pathname.endsWith("/"), true);
});
