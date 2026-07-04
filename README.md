# Public Website (LiveHub)

React (Vite) app where any visitor can see who's live and join instantly.

## Folder structure
```
src/
├── main.jsx
├── App.jsx                   # routes: /, /watch/:influencerId
├── index.css
├── api/
│   └── axios.js               # public axios instance, no auth
├── components/
│   ├── Navbar.jsx              # links out to Influencer Panel registration
│   ├── LiveCard.jsx             # one live-influencer tile on the homepage
│   └── ZoomViewerEmbed.jsx      # embeds Zoom Meeting SDK as a viewer
└── pages/
    ├── Home.jsx                 # hero + live grid, auto-refreshes every 10s
    └── Watch.jsx                 # asks display name, then joins the stream
```

## Setup
```bash
cp .env.example .env
npm install
npm run dev
```
Runs on **http://localhost:3000**.

## Flow
1. Homepage polls `/api/influencer/live-list` every 10 seconds and shows a
   card for each influencer currently live.
2. Clicking a card goes to `/watch/:influencerId`.
3. Visitor types a display name → app calls `/api/live/join/:influencerId` →
   backend returns Zoom join credentials (as attendee) → video embeds
   directly on this page, no zoom.us redirect, no Zoom branding.
4. Multiple influencers can be live at once — each `/watch/:id` page joins
   that specific influencer's separate Zoom meeting.

## Notes
- "Become a creator" button links to the Influencer Panel's `/register`
  page (`VITE_INFLUENCER_PANEL_URL`, default `http://localhost:3002`).
- If a stream ends while someone is watching, refreshing `/watch/:id` will
  show "not live right now" instead of an error page.
