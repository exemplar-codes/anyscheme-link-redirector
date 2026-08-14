"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [copied, setCopied] = useState(false);

  function generate(event: FormEvent) {
    event.preventDefault();
    const link = new URL("/redirect", window.location.origin);
    link.searchParams.set("target", url);
    setRedirectUrl(link.toString());
    setCopied(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(redirectUrl);
    setCopied(true);
  }

  return (
    <main className="shell">
      <section className="generator" aria-labelledby="page-title">
        <div className="eyebrow"><span aria-hidden="true" /> URL redirector</div>
        <h1 id="page-title">Make any URL<br />clickable anywhere.</h1>
        <p className="intro">
          Wrap any destination—even a custom app link—in a clean HTTPS URL.
          Nothing is stored.
        </p>

        <form onSubmit={generate}>
          <label htmlFor="destination">Destination URL</label>
          <div className="inputRow">
            <input
              id="destination"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="codex://workspace/item?id=123"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            <button type="submit">Generate link</button>
          </div>
        </form>

        {redirectUrl && (
          <div className="result" aria-live="polite">
            <div>
              <span>Your HTTPS link</span>
              <output>{redirectUrl}</output>
            </div>
            <button type="button" className="copy" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        <p className="privacy"><span aria-hidden="true">◆</span> Generated entirely in your browser</p>
      </section>
    </main>
  );
}
