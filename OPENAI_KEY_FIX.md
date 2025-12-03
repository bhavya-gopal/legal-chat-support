# Why You're Getting an Auth Error

## The Problem

You added the OpenAI API key to **GitHub Secrets**, but that's not where it needs to be.

## Key Distinction

There are **two different places** for environment variables:

### 1. GitHub Secrets (For Frontend Build)
These are used when **building** your frontend:
- `VITE_API_URL` - Where your backend is hosted
- `VITE_SURVEY_URL` - Survey link URL

### 2. Backend Environment Variables (For Backend Server)
This is where your **OpenAI API key** needs to go:
- `OPENAI_API_KEY` - Your OpenAI API key (for the backend server)

## The Issue

- ✅ **Frontend** (GitHub Pages) - Just displays the UI
- ❌ **Backend** (Needs separate hosting) - This is where OpenAI API key is used

Your backend needs to be **deployed separately** and given the OpenAI API key as an environment variable there.

## Where is the Error Coming From?

### Scenario 1: Local Development
If you're running locally:
- Check: `backend/.env` file exists and has `OPENAI_API_KEY=...`
- Restart your backend server after adding it

### Scenario 2: Deployed Backend
If your backend is deployed:
- The backend hosting service (Railway/Render/etc.) needs the environment variable
- GitHub Secrets won't help here - backend needs its own environment variables

### Scenario 3: No Backend Deployed
If you haven't deployed the backend yet:
- GitHub Secrets won't help - you need to deploy the backend first
- Then add the API key to that hosting service

## Solution

### If Running Locally:

1. **Create/Update** `backend/.env`:
   ```bash
   cd backend
   ```
   
2. **Add your API key**:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

3. **Restart your backend server**

### If Backend is Deployed:

Add the environment variable to your hosting service:

**Railway:**
1. Go to your Railway project
2. Click on your backend service
3. Go to "Variables" tab
4. Add: `OPENAI_API_KEY` = your key
5. Redeploy

**Render:**
1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Environment" section
4. Add: `OPENAI_API_KEY` = your key
5. Save and redeploy

### If Backend is NOT Deployed:

You need to deploy it first! See `BACKEND_URL_EXPLANATION.md` for instructions.

## Quick Checklist

- [ ] Backend deployed to Railway/Render/etc.?
- [ ] `OPENAI_API_KEY` added to backend hosting environment variables?
- [ ] Backend service restarted/redeployed after adding key?
- [ ] Frontend has `VITE_API_URL` pointing to backend URL?

## What NOT to Do

❌ Don't put `OPENAI_API_KEY` in GitHub Secrets  
❌ Don't put it in frontend `.env` files  
❌ Don't commit it to git  

✅ Do put it in backend hosting environment variables  
✅ Do put it in `backend/.env` for local development  

## Summary

**GitHub Secrets** ≠ **Backend Environment Variables**

- **GitHub Secrets**: For frontend build configuration
- **Backend Environment Variables**: For backend runtime configuration (where OpenAI key goes)

Your auth error is because the backend doesn't have access to the OpenAI API key. You need to add it to your backend deployment, not GitHub Secrets.

