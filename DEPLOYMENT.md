# GitHub Pages Deployment Guide

This guide will help you deploy the frontend to GitHub Pages. **Note:** GitHub Pages only serves static files, so your backend API will need to be deployed separately (see Backend Deployment section below).

## Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step 1: Create a GitHub Repository

1. **Go to GitHub** and sign in
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the repository details:**
   - Repository name: `legal-support-chat` (or your preferred name)
   - Description: "Legal support chat interface for AI startup founders"
   - Choose **Public** or **Private** (Public is free for GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

## Step 2: Initialize Git and Push to GitHub

1. **Open terminal** in your project directory (`/Users/bhavyagopal/product-studio-experiment`)

2. **Initialize Git** (if not already initialized):
   ```bash
   git init
   ```

3. **Add all files:**
   ```bash
   git add .
   ```

4. **Create initial commit:**
   ```bash
   git commit -m "Initial commit: Legal support chat interface"
   ```

5. **Add GitHub remote** (replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   ```

6. **Rename branch to main** (if needed):
   ```bash
   git branch -M main
   ```

7. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

## Step 3: Configure GitHub Pages Deployment

### Option A: Deploy via gh-pages package (Recommended)

1. **Update the repo name in vite config** (replace `REPO_NAME` with your actual repo name):
   ```bash
   cd frontend
   ```

   Edit `vite.config.js` and update the repo name, or set it via environment variable:
   ```bash
   GITHUB_REPO_NAME=legal-support-chat npm run build
   ```

2. **Build and deploy:**
   ```bash
   npm run deploy
   ```

   This will:
   - Build the frontend
   - Push the `dist` folder to the `gh-pages` branch
   - GitHub Pages will automatically serve from that branch

3. **Enable GitHub Pages in repository settings:**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Select branch: **gh-pages**
   - Select folder: **/ (root)**
   - Click **Save**

### Option B: Manual GitHub Actions (Alternative)

You can also set up GitHub Actions for automatic deployment. See the GitHub Actions section below.

## Step 4: Configure Backend API URL

Since GitHub Pages only serves static files, you'll need to deploy your backend separately and configure the frontend to point to it.

1. **Create `.env.production` file** in the `frontend` directory:
   ```bash
   cd frontend
   echo "VITE_API_URL=https://your-backend-url.com" > .env.production
   ```

   Replace `https://your-backend-url.com` with your actual backend deployment URL.

2. **Rebuild and redeploy:**
   ```bash
   npm run deploy
   ```

## Step 5: Access Your Deployed Site

After deployment, your site will be available at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

It may take a few minutes for GitHub Pages to publish your site after the first deployment.

## Backend Deployment Options

Your backend API needs to be deployed separately. Here are some options:

### Option 1: Render (Free Tier Available)
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Point to the `backend` directory
5. Add environment variable `OPENAI_API_KEY`
6. Deploy

### Option 2: Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create a new project from the backend directory
4. Add environment variable `OPENAI_API_KEY`
5. Deploy

### Option 3: Heroku
1. Install Heroku CLI
2. Create a new app
3. Deploy the backend directory
4. Set environment variables
5. Deploy

### Option 4: Vercel/Netlify Functions
Convert your Express backend to serverless functions for deployment on Vercel or Netlify.

## Environment Variables

### Frontend (for GitHub Pages)
Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.com
VITE_SURVEY_URL=https://your-survey-url.com/survey
GITHUB_REPO_NAME=your-repo-name
```

### Backend (for separate hosting)
Create `.env` in backend directory:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

## Troubleshooting

### CORS Issues
If you get CORS errors, update your backend `server.js` to allow your GitHub Pages URL:
```javascript
app.use(cors({
  origin: ['https://YOUR_USERNAME.github.io', 'http://localhost:5173']
}));
```

### 404 Errors on Page Refresh
This is normal for single-page apps on GitHub Pages. Consider using a custom domain or implementing a 404 redirect.

### API Not Working
1. Check that your backend is deployed and running
2. Verify `VITE_API_URL` is set correctly in `.env.production`
3. Check browser console for errors
4. Verify CORS settings on backend

## Updating Your Deployment

To update your deployed site:

1. **Make your changes**
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

3. **Rebuild and redeploy:**
   ```bash
   cd frontend
   npm run deploy
   ```

## GitHub Actions (Optional - Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Build
        run: |
          cd frontend
          GITHUB_REPO_NAME=${{ github.event.repository.name }} npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_SURVEY_URL: ${{ secrets.VITE_SURVEY_URL }}
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

Then add secrets in GitHub: Settings → Secrets → Actions

## Quick Reference Commands

```bash
# Build and deploy to GitHub Pages
cd frontend
npm run deploy

# Build only (to test)
cd frontend
npm run build

# Preview production build locally
cd frontend
npm run preview
```

