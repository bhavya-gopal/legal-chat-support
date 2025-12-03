# Frontend OpenAI API Setup

This application calls the OpenAI API **directly from the frontend** (no backend server needed).

## ⚠️ Important Security Warning

**Your OpenAI API key will be visible in the browser's JavaScript code.** This means:
- ✅ Acceptable for: Prototypes, experiments, demos
- ❌ NOT acceptable for: Production applications, public apps

Anyone can open your website, view the source code, and see your API key. They could then use it to make their own API calls.

**For production apps, always use a backend server to protect your API keys.**

## Setup with GitHub Secrets

### Step 1: Add API Key to GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-` or `k-proj-`)
5. Click **Add secret**

### Step 2: Optional - Add Survey URL

1. Click **New repository secret** again
2. Add:
   - **Name**: `VITE_SURVEY_URL`
   - **Value**: Your survey URL (e.g., `https://forms.google.com/...`)

### Step 3: Deploy

Push to GitHub and the workflow will automatically:
- Build your frontend with the API key from secrets
- Deploy to GitHub Pages

## Local Development Setup

For local development, create `frontend/.env.local`:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_SURVEY_URL=https://your-survey-url.com
```

**Note**: `.env.local` is in `.gitignore` and won't be committed to git.

## How It Works

1. **GitHub Secrets** stores your API key securely
2. **GitHub Actions** uses it during build: `VITE_OPENAI_API_KEY=${{ secrets.VITE_OPENAI_API_KEY }}`
3. **Vite** replaces `import.meta.env.VITE_OPENAI_API_KEY` with the actual key
4. **Frontend** uses the OpenAI SDK to call the API directly from the browser

## Testing Locally

1. Create `frontend/.env.local` with your API key
2. Run: `cd frontend && npm run dev`
3. The app will use your local API key

## Troubleshooting

### "API key not set" error
- Check that `VITE_OPENAI_API_KEY` is in GitHub Secrets
- For local: Check that `.env.local` exists in `frontend/` directory

### Authentication error
- Verify your API key is correct
- Check that it starts with `sk-` or `k-proj-`
- Make sure there are no extra spaces

### Rate limit errors
- Your API key has usage limits
- Check your OpenAI account dashboard

## Migration from Backend

If you were previously using a backend server:
- ✅ You can remove the backend code
- ✅ No need to deploy backend separately
- ⚠️ Remember: API key is now exposed in frontend

## Best Practices for Experiments

Even for experiments, consider:
1. Using OpenAI API key with usage limits/budgets
2. Monitoring usage in OpenAI dashboard
3. Rotating keys if exposed
4. Using rate limiting features in OpenAI dashboard

For production, always use a backend server!

