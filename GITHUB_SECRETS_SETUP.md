# GitHub Secrets Configuration Guide

This guide shows you how to configure environment variables using GitHub Secrets for automatic deployment via GitHub Actions.

## Why GitHub Secrets?

- ✅ **Secure**: Secrets are encrypted and never exposed in logs
- ✅ **Automatic**: Variables are injected during build/deployment
- ✅ **Centralized**: Manage all config in one place
- ✅ **Team-friendly**: Works for all collaborators

## Setting Up GitHub Secrets

### Step 1: Go to Repository Settings

1. Navigate to your GitHub repository
2. Click on the **Settings** tab (top navigation)
3. In the left sidebar, scroll down to **Secrets and variables** → **Actions**

### Step 2: Add Secrets

Click **New repository secret** for each environment variable you want to set:

#### Required Secrets (for production deployment)

⚠️ **SECURITY WARNING**: Adding your OpenAI API key to GitHub Secrets will expose it in your frontend JavaScript code. Anyone can view your API key in the browser. Only use this for prototypes/experiments, not production applications.

1. **VITE_OPENAI_API_KEY** (Required)
   - Name: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key (e.g., `sk-proj-...`)
   - ⚠️ **Warning**: This will be visible in your browser's JavaScript
   - Click **Add secret**

2. **VITE_SURVEY_URL** (optional but recommended)
   - Name: `VITE_SURVEY_URL`
   - Value: Your survey URL (e.g., `https://forms.google.com/your-survey`)
   - Click **Add secret**

### Step 3: Optional Secrets

The repository name is automatically detected, but you can override it:

- **VITE_REPO_NAME** (optional)
  - Only needed if your repo name doesn't match the GitHub Pages URL structure
  - Usually not needed - it's auto-detected

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:

1. **Trigger** on every push to `main` branch (or manually)
2. **Build** your frontend using the secrets as environment variables
3. **Deploy** to GitHub Pages automatically

## Secret Names Reference

| Secret Name | Description | Example Value | Required |
|------------|-------------|---------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key | `sk-proj-...` | ✅ Yes |
| `VITE_SURVEY_URL` | Survey form URL | `https://forms.google.com/...` | ⚠️ Recommended |
| `VITE_REPO_NAME` | Override repo name | `legal-support-chat` | ❌ Auto-detected |

## Important Notes

⚠️ **Important**: These are build-time variables that get baked into your static files. They are visible in the browser's JavaScript.

### Security Warning

**Your OpenAI API key WILL be exposed in the browser's JavaScript code.** This is acceptable for:
- ✅ Prototypes and experiments
- ✅ Internal demos
- ❌ NOT for production applications

For production, always use a backend server to protect your API keys.

### Why VITE_ Prefix?

Vite only exposes environment variables that start with `VITE_` to your client-side code. This is a security feature to prevent accidentally exposing sensitive variables.

## Using the Workflow

### Automatic Deployment

Once secrets are set up, the workflow will automatically deploy when you push to `main`:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

GitHub Actions will:
1. Build your frontend with the secrets
2. Deploy to GitHub Pages
3. Your site will be updated automatically

### Manual Deployment

You can also trigger deployment manually:

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button
5. Select branch (usually `main`)
6. Click **Run workflow**

## Enabling GitHub Pages for Actions

The workflow uses the new GitHub Pages deployment method. To enable it:

1. Go to **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Save

This allows GitHub Actions to deploy to Pages automatically.

## Testing Locally with Secrets

To test builds locally with the same configuration, create `frontend/.env.production.local`:

```bash
# frontend/.env.production.local
VITE_API_URL=https://your-backend-url.com
VITE_SURVEY_URL=https://your-survey-url.com
VITE_REPO_NAME=your-repo-name
```

Then build:
```bash
cd frontend
npm run build
```

## Updating Secrets

To update a secret:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Find the secret you want to update
3. Click the **✏️ Update** button (pencil icon)
4. Enter new value
5. Click **Update secret**

**Important**: After updating secrets, you need to trigger a new deployment:

- Push a new commit, OR
- Manually trigger the workflow (Actions → Run workflow)

## Troubleshooting

### Secrets Not Working?

1. **Check secret names**: Must match exactly (case-sensitive)
   - ✅ `VITE_API_URL`
   - ❌ `vite_api_url` or `VITE_API_URL ` (trailing space)

2. **Verify workflow file**: Check `.github/workflows/deploy.yml` exists

3. **Check workflow logs**: 
   - Go to **Actions** tab
   - Click on the failed workflow run
   - Check the build step logs

4. **Rebuild required**: Secrets are only used during build, so:
   - Push a new commit, OR
   - Manually trigger the workflow

### API Not Working After Deployment?

1. **Check CORS on backend**: Your backend must allow requests from your GitHub Pages URL
   ```javascript
   // backend/server.js
   app.use(cors({
     origin: [
       'https://YOUR_USERNAME.github.io',
       'http://localhost:5173'
     ]
   }));
   ```

2. **Verify secret value**: Make sure `VITE_API_URL` is set correctly
   - Should be full URL: `https://your-backend.com`
   - No trailing slash

3. **Check browser console**: Look for CORS or network errors

## Security Best Practices

1. ✅ **Use secrets for sensitive URLs** (even if they're public)
2. ✅ **Rotate secrets regularly** if they contain tokens
3. ❌ **Never commit secrets** to the repository
4. ❌ **Never log secrets** in your code

## Quick Checklist

- [ ] Repository secrets configured (Settings → Secrets → Actions)
- [ ] `VITE_API_URL` secret added
- [ ] `VITE_SURVEY_URL` secret added (optional)
- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] Workflow file exists (`.github/workflows/deploy.yml`)
- [ ] Push to main branch to trigger first deployment

## Alternative: Using gh-pages Locally

If you prefer deploying locally instead of using GitHub Actions:

```bash
# Set environment variables before building
export VITE_API_URL=https://your-backend-url.com
export VITE_SURVEY_URL=https://your-survey-url.com
export GITHUB_REPO_NAME=your-repo-name

cd frontend
npm run deploy
```

This method doesn't use GitHub Secrets - you set variables in your terminal.

