# anyscheme-link-redirector

Turns any URL into a standard HTTPS link that redirects to the original URL.

```bash
npm install
npm run dev
```

- `/` generates redirect links.
- `/redirect?target=...` opens the encoded destination.

Destinations are encoded in the link itself; nothing is stored.
