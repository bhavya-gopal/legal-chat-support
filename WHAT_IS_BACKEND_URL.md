# What is a Backend URL? 🤔

## Simple Answer

A **Backend URL** is the internet address where your backend API server is publicly accessible.

**Right now:** You don't have one yet - your backend only runs on your computer (`localhost:3001`)

**You need:** A public URL like `https://your-backend.railway.app` so your GitHub Pages site can talk to it.

---

## Current Setup vs. What You Need

### Current (Local Development)
```
Your Computer:
├── Frontend: http://localhost:5173 ✅ Works
└── Backend:  http://localhost:3001 ✅ Works (only on your computer)
```

### Production (What You Need)
```
Internet:
├── Frontend: https://yourname.github.io/repo/ ✅ (GitHub Pages)
└── Backend:  https://your-backend.railway.app ❌ (Need to deploy this!)
```

---

## What is a Backend URL Used For?

When someone visits your GitHub Pages site and tries to chat:
1. Frontend sends message to: `VITE_API_URL/api/chat`
2. Backend processes it (calls OpenAI)
3. Backend sends response back to frontend
4. User sees the AI response

**Without a backend URL:** The chat won't work! ❌

---

## Quick Example

If you deploy your backend to Railway and get:
```
https://legal-chat-api-production.up.railway.app
```

**That's your backend URL!** 

Set it in GitHub Secrets as:
```
VITE_API_URL = https://legal-chat-api-production.up.railway.app
```

---

## Do I Need One Right Now?

**For local development:** No - it already works on `localhost:3001`

**For GitHub Pages deployment:** Yes - you need to deploy the backend first

---

## Next Steps

1. **Deploy backend** to Railway/Render (see guides below)
2. **Get the URL** they provide (that's your backend URL!)
3. **Add it to GitHub Secrets** as `VITE_API_URL`
4. **Done!** Your frontend will use it automatically

See `BACKEND_URL_EXPLANATION.md` for detailed deployment instructions!

