import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [home, redirect, styles] = await Promise.all([
  readFile(new URL("index.html", import.meta.url), "utf8"),
  readFile(new URL("redirect/index.html", import.meta.url), "utf8"),
  readFile(new URL("styles.css", import.meta.url), "utf8"),
]);

assert.match(home, /Paste a URL/);
assert.doesNotMatch(home, /Generate link/);
assert.match(home, /autofocus/);
assert.match(home, /required/);
assert.match(redirect, /location\.href = target/);
const script = await readFile(new URL("script.js", import.meta.url), "utf8");
assert.match(script, /navigator\.clipboard\.writeText/);
assert.match(script, /event\.key !== "Escape"/);
assert.match(script, /input\.focus\(\);\s*$/);
assert.doesNotMatch(script, /input\.select/);
assert.ok(script.indexOf("!input.value.trim()") < script.indexOf("navigator.clipboard.writeText"));
assert.match(styles, /grid-template-columns: minmax\(0, 1fr\)/);
assert.match(styles, /overflow-x: hidden/);
assert.equal(
  new URL("redirect/?target=codex%3A%2F%2Fitem", "https://example.com/tool/").href,
  "https://example.com/tool/redirect/?target=codex%3A%2F%2Fitem",
);
