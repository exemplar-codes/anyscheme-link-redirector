import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [home, redirect] = await Promise.all([
  readFile(new URL("index.html", import.meta.url), "utf8"),
  readFile(new URL("redirect/index.html", import.meta.url), "utf8"),
]);

assert.match(home, /Make any URL/);
assert.match(redirect, /location\.href = target/);
assert.equal(
  new URL("redirect/?target=codex%3A%2F%2Fitem", "https://example.com/tool/").href,
  "https://example.com/tool/redirect/?target=codex%3A%2F%2Fitem",
);
