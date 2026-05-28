# XakChat - Discord + Telegram Hybrid

A beautiful, real-time messaging platform built with Next.js and Firebase. Part of the Xakteir ecosystem.

## Features

✨ **Real-time Messaging** - Firebase Firestore powered
🎨 **Stunning UI** - Xakteir gradient design system
🔐 **Firebase Auth** - Secure authentication
🌐 **3D Ready** - Architecture ready for 3D rooms
🎤 **Voice Channels** - UI foundation for voice chat
🎮 **Servers** - Community management ready

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts** to connect GitHub and set project settings

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial XakChat commit"
   git remote add origin https://github.com/YOUR_USERNAME/xakchat.git
   git push -u origin main
   ```

2. **Import in Vercel:**
   - Go to https://vercel.com/new
   - Select GitHub repo
   - Click "Import"
   - Vercel auto-detects it's a Next.js project

3. **Configure Environment Variables:**
   - In Vercel project settings → Environment Variables
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

4. **Deploy!** - Vercel builds and deploys automatically

## Custom Domain (chat.xakteir.com)

1. In Vercel project settings → Domains
2. Add custom domain: `chat.xakteir.com`
3. Follow DNS configuration instructions
4. Point your domain registrar to Vercel nameservers

## Project Structure

```
xakchat-app/
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   ├── _document.tsx     # HTML document setup
│   ├── index.tsx         # Landing page
│   ├── auth.tsx          # Login/signup page
│   └── chat.tsx          # Main chat dashboard
├── lib/
│   └── firebase.ts       # Firebase configuration
├── styles/
│   └── globals.css       # Global styles
├── .env.local            # Environment variables
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Auto-Login Feature

XakChat shares the same Firebase project as xakteir.com. When a user logs into xakteir.com, they can:

1. Visit chat.xakteir.com
2. XakChat checks Firebase auth state
3. If authenticated, auto-redirects to `/chat`
4. No manual login needed!

This works because:
- Same Firebase project (`studio-8200495018-c2379`)
- Firebase auth tokens are stored in `localStorage`
- Both subdomains can access the same auth state

## Roadmap

- [ ] Real-time messaging with Firestore
- [ ] Server creation and management
- [ ] User profiles and avatars
- [ ] Voice channels (WebRTC integration)
- [ ] 3D rooms (Three.js)
- [ ] Direct messaging
- [ ] Message reactions and threads
- [ ] User presence indicators
- [ ] File sharing and uploads
- [ ] Mobile responsive design

## Technologies

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Backend:** Firebase (Auth + Firestore)
- **Styling:** CSS-in-JS
- **Deployment:** Vercel

## License

Part of Xakteir Ecosystem - All rights reserved.
