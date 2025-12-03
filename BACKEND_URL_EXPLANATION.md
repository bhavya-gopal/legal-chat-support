# What is a Backend URL?

## Current Situation

Right now, your application has **two parts**:

1. **Frontend** (React app) - The user interface
2. **Backend** (Express API) - Handles OpenAI API calls and serves chat responses

### Currently (Local Development)
- Frontend runs on: `http://localhost:5173`
- Backend runs on: `http://localhost:3001`

When you run `npm run dev`, both work together on your computer.

## The Problem with GitHub Pages

**GitHub Pages only serves static files** (HTML, CSS, JavaScript). It cannot run your backend server.

So when you deploy your frontend to GitHub Pages, it won't have access to your backend running on `localhost:3001` (which only exists on your computer).

## What is a Backend URL?

A **Backend URL** is the public internet address where your backend API is deployed and running.

Instead of:
- ❌ `http://localhost:3001` (only works on your computer)

You need:
- ✅ `https://your-backend-name.railway.app` (works from anywhere on the internet)

## What You Need to Do

### Option 1: Deploy Backend First (Recommended)

1. **Deploy your backend** to a hosting service (see options below)
2. **Get the public URL** (e.g., `https://legal-chat-api.railway.app`)
3. **Use that URL** as your `VITE_API_URL` in GitHub Secrets

### Option 2: Deploy Frontend Without Backend (Testing UI Only)

If you just want to test the frontend UI without the chat working:
- Leave `VITE_API_URL` empty or unset
- The frontend will show, but chat won't work (you'll see errors)

## Backend Deployment Options (Free/Cheap)

### 🚀 Option 1: Railway (Easiest, Free Tier)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will detect it's a Node.js app
7. Set the **Root Directory** to: `backend`
8. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: (your OpenAI API key)
9. Deploy!

**After deployment, Railway gives you a URL like:**
```
https://legal-chat-api-production.up.railway.app
```

**This is your backend URL!** Use it as `VITE_API_URL`

### 🎨 Option 2: Render (Free Tier)

1. Go to [render.com](https://render.com)
2. Sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `legal-chat-backend`
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
6. Add environment variable:
   - `OPENAI_API_KEY` = your key
7. Click "Create Web Service"

**After deployment, Render gives you a URL like:**
```
https://legal-chat-backend.onrender.com
```

**This is your backend URL!** Use it as `VITE_API_URL`

### 🔧 Option 3: Fly.io (Free Tier)

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Sign up: `fly auth signup`
3. In your `backend` directory:
   ```bash
   fly launch
   ```
4. Follow the prompts
5. Add secret: `fly secrets set OPENAI_API_KEY=your_key`

**After deployment, Fly.io gives you a URL like:**
```
https://legal-chat-api.fly.dev
```

## Step-by-Step: Deploy Backend to Railway

### 1. Prepare Your Backend

Make sure your `backend/package.json` has a start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

### 2. Deploy on Railway

1. Visit [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your repositories
5. Select your repository
6. Railway will show your repo. Click on it
7. In the settings:
   - Set **Root Directory** to: `backend`
   - Click **Variables** tab
   - Add variable:
     - Name: `OPENAI_API_KEY`
     - Value: (paste your OpenAI API key)
8. Railway will automatically deploy!

### 3. Get Your Backend URL

1. After deployment, Railway shows a "Settings" tab
2. Look for "Networking" section
3. You'll see a "Public URL" - this is your backend URL!
4. It looks like: `https://your-project-name.up.railway.app`

### 4. Update CORS in Backend (Important!)

Update your `backend/server.js` to allow your GitHub Pages domain:

```javascript
app.use(cors({
  origin: [
    'https://YOUR_USERNAME.github.io',
    'http://localhost:5173'
  ]
}));
```

Replace `YOUR_USERNAME` with your GitHub username.

### 5. Set GitHub Secret

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `VITE_API_URL`
5. Value: Your Railway URL (e.g., `https://your-project-name.up.railway.app`)
6. Click "Add secret"

## Example: Complete Setup

### Local Development
```
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

### Production
```
Frontend: https://yourusername.github.io/legal-support-chat/
Backend:  https://legal-chat-api.up.railway.app
```

### GitHub Secret `VITE_API_URL`
```
https://legal-chat-api.up.railway.app
```

## Testing

After setting up:

1. **Deploy backend** → Get URL (e.g., `https://api.example.com`)
2. **Add GitHub Secret** → `VITE_API_URL` = `https://api.example.com`
3. **Push to GitHub** → Frontend deploys automatically
4. **Test chat** → Should work from GitHub Pages!

## Troubleshooting

### Backend URL not working?
- Make sure backend is deployed and running
- Check the backend logs in Railway/Render
- Verify `OPENAI_API_KEY` is set correctly

### CORS errors?
- Update backend `server.js` to allow your GitHub Pages domain
- Check browser console for exact error

### Backend URL format?
- Must start with `https://`
- No trailing slash
- Example: `https://my-api.railway.app` ✅
- Example: `http://my-api.railway.app/` ❌ (http + trailing slash)

## Quick Summary

**Backend URL** = The public internet address where your backend API server is running.

- Currently: You don't have one (only localhost)
- You need to: Deploy backend to Railway/Render/etc.
- Then use: The public URL they give you as `VITE_API_URL`

Need help deploying? See the detailed guides for each platform in `DEPLOYMENT.md`.

