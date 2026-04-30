# sanukhan.dev

Personal portfolio website for Sanu Khan.

## Chat API

The Zaakiy chat widget calls `VITE_ZAAKIY_API_URL`.

For local dev and preview, the app serves `/api/zaakiy-chat` through the Vite wrapper in [vite.config.ts](c:\Users\khans\Documents\work\sanukhandev.github.io\vite.config.ts).

For static deployments such as GitHub Pages, point `VITE_ZAAKIY_API_URL` to an external backend that exposes the same route.
