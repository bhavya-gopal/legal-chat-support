# Quick Deployment Guide

## 🚀 Quick Start - Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
   - Name it: `legal-support-chat` (or your preferred name)
   - Make it **Public** (required for free GitHub Pages)
   - **Don't** initialize with README

### Step 2: Push Your Code

```bash
# Navigate to project directory
cd /Users/bhavyagopal/product-studio-experiment

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Configure and Deploy

1. **Set your repository name** in the frontend directory:

```bash
cd frontend

# Replace 'legal-support-chat' with your actual repo name
export GITHUB_REPO_NAME=legal-support-chat
```

2. **Deploy to GitHub Pages:**

```bash
npm run deploy
```

This will:
- Build your frontend
- Push to the `gh-pages` branch
- Make it available on GitHub Pages

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 5: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

⚠️ **Important:** The backend API won't work on GitHub Pages since it only serves static files. You'll need to deploy the backend separately. See `DEPLOYMENT.md` for backend deployment options.

## 🔄 Updating Your Deployment

To update your deployed site:

```bash
cd frontend
npm run deploy
```

## ⚙️ Configuration

### For Custom Backend URL

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.com
VITE_SURVEY_URL=https://your-survey-url.com/survey
```

Then rebuild and redeploy:
```bash
npm run deploy
```

### For Different Repo Name

Set the environment variable before deploying:
```bash
export GITHUB_REPO_NAME=your-repo-name
npm run deploy
```

Or add to `frontend/.env.production`:
```
VITE_REPO_NAME=your-repo-name
```

## 📝 Troubleshooting

- **404 on page refresh?** This is normal for SPAs. Consider using a custom domain.
- **API not working?** Deploy your backend separately and set `VITE_API_URL`.
- **Build errors?** Check that all dependencies are installed: `npm install`

For detailed instructions, see `DEPLOYMENT.md`.

