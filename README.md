# VZN Anon

VZN Anon is a multi-page anonymous social app prototype built with React + TypeScript + Vite and a lightweight WebSocket server.

## Run locally

```bash
npm install
npm run dev
```

This starts:
- Frontend on `http://localhost:5173`
- Chat websocket server on `ws://localhost:3002`

## Pages

- `/` landing
- `/signup` signup
- `/login` login
- `/feed` feed + card editor
- `/profile` profile settings
- `/inbox` anonymous inbox
- `/dashboard` weekly stats
- `/group-chat` anonymous group chat
- `/about` about

## Highlights

- Responsive layout for mobile and desktop
- Light/dark theme toggle
- Real-time group chat (messages + reactions)
- Popup reaction picker on message tap
- Feed card editor powered by Fabric.js
- Created with love — my broken VZN
