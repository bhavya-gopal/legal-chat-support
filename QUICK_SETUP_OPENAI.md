# Quick Setup: OpenAI API Key in GitHub Secrets

## ✅ What Changed

Your app now calls the OpenAI API **directly from the frontend** - no backend server needed!

## 🔑 Setup Steps

### 1. Add Your OpenAI API Key to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-` or `k-proj-`)
5. Click **Add secret**

### 2. Optional: Add Survey URL

1. Click **New repository secret** again
2. Add:
   - **Name**: `VITE_SURVEY_URL`
   - **Value**: Your survey URL

### 3. Deploy

Just push to GitHub - it will deploy automatically!

```bash
git add .
git commit -m "Use OpenAI API directly from frontend"
git push origin main
```

## 🧪 Local Testing

Create `frontend/.env.local`:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_SURVEY_URL=https://your-survey-url.com
```

Then run:
```bash
cd frontend
npm run dev
```

## ⚠️ Important Security Note

**Your API key will be visible in the browser's JavaScript code.** This is fine for experiments/prototypes, but NOT for production apps.

## 📚 More Info

- See `FRONTEND_OPENAI_SETUP.md` for detailed information
- See `GITHUB_SECRETS_SETUP.md` for GitHub Secrets guide

