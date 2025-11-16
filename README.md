# Imagify — Full Stack Image Generation App

This repository contains the full-stack Imagify project: a React + Vite frontend (client/) and an Express + Node backend (server/) that together provide an image generation flow, user authentication, and credit management.

The client is a lightweight UI for signing in, creating prompts, and viewing generated images. The server handles authentication, stores user accounts and credit balances in MongoDB, and proxies requests to a third-party image-generation API (Clipdrop).

## Repository layout

-  `client/` — React + Vite frontend
-  `server/` — Express backend (MongoDB, JWT auth, image generation controller)

## Tech stack

-  Frontend: React, Vite, Tailwind-style utility classes
-  Backend: Node.js (ESM), Express, Mongoose (MongoDB), JWT for auth
-  Third-party services: Clipdrop text-to-image API (server-side)
-  Package manager: pnpm (recommended) — npm/yarn supported

## Prerequisites

-  Node.js 14+ (use the version you prefer; consider adding `.nvmrc`)
-  MongoDB instance (local or cloud Atlas)
-  pnpm (recommended): https://pnpm.io/

## Environment variables

Create a `.env` file in `server/` with these variables (examples):

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/imagify
JWT_SECRET=your_jwt_secret_here
CLIPDROP_API=your_clipdrop_api_key_here
```

Frontend environment variables (if needed) go into `client/.env` and should use the `VITE_` prefix (e.g. `VITE_API_URL=http://localhost:4000`).

## Local development (quick start)

Start the server and client in separate terminals.

Server:

```bash
cd server
pnpm install
pnpm run dev
```

This runs `nodemon server.js` (watch mode). The server listens on `PORT` (default 4000).

Client:

```bash
cd client
pnpm install
pnpm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

If you prefer npm:

```bash
cd server && npm install
cd client && npm install
```

And use `npm run dev` in each folder.

## API overview (server)

Base URL: http://localhost:4000 (or the `PORT` you set)

Available routes:

-  POST /api/users/register — Register a new user. Body: { name, email, password }
-  POST /api/users/login — Login. Body: { email, password }. Returns JWT token.
-  GET /api/users/credits — Get user credit balance. Requires header: { token: <JWT> }
-  POST /api/images/generate-image — Generate an image from a prompt. Requires auth header token and body: { prompt }

Notes:

-  The server proxies the request to Clipdrop using the `CLIPDROP_API` key and returns a base64 image string.
-  Each successful image generation deducts 1 credit from the user's `creditBalance`.
