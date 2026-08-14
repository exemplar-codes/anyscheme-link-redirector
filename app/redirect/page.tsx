"use client";

import { useEffect, useState } from "react";

export default function Redirect() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const destination = new URLSearchParams(window.location.search).get("target");
    setTarget(destination);
    if (destination !== null) window.location.href = destination;
  }, []);

  return (
    <main className="shell">
      <section className="redirectCard">
        <div className="eyebrow"><span aria-hidden="true" /> URL redirector</div>
        <h1>{target === null ? "No destination" : "Opening your link…"}</h1>
        <p>
          {target === null
            ? "This redirect link does not contain a destination."
            : "Your browser may ask for permission to open another app."}
        </p>
        {target !== null && (
          <button type="button" onClick={() => { window.location.href = target; }}>
            Open manually
          </button>
        )}
      </section>
    </main>
  );
}
