# How to Update the Survey URL

The survey URL is configured via the `VITE_SURVEY_URL` environment variable. Here's where and how to update it:

## Option 1: GitHub Secrets (For Automatic Deployment)

If you're using GitHub Actions to deploy automatically:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Find or create secret named: `VITE_SURVEY_URL`
4. Set the value to your survey URL (e.g., `https://forms.google.com/your-survey`)
5. Click **Update secret** or **Add secret**

**Note:** After updating, push a new commit to trigger a rebuild, or manually trigger the workflow.

## Option 2: Local .env.production File (For Manual Deployment)

If you're deploying manually using `npm run deploy`:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Create or edit `.env.production` file:
   ```bash
   nano .env.production
   # or use any text editor
   ```

3. Add or update the survey URL:
   ```
   VITE_SURVEY_URL=https://forms.google.com/your-survey
   VITE_OPENAI_API_KEY=your_api_key_here
   VITE_REPO_NAME=your-repo-name
   ```

4. Save the file and redeploy:
   ```bash
   npm run deploy
   ```

## Option 3: Environment Variable (One-time Manual Deploy)

You can also set it directly when deploying:

```bash
export VITE_SURVEY_URL="https://forms.google.com/your-survey"
cd frontend
npm run deploy
```

## Survey URL Format

The survey URL should be a complete URL:
- ✅ `https://forms.google.com/d/e/1FAIpQLSd.../viewform`
- ✅ `https://typeform.com/to/abc123`
- ✅ `https://survey.example.com/my-survey`
- ❌ `forms.google.com/...` (missing https://)
- ❌ `/survey` (not a full URL)

## How the Survey URL is Used

When users complete 5 messages, they'll see a survey button. When clicked:
- Opens in a new tab
- Appends the session ID as a query parameter
- Final URL: `https://your-survey-url.com?session=session_1234567890_abc123`

## Testing Locally

For local development, create `frontend/.env.local`:

```
VITE_SURVEY_URL=https://forms.google.com/your-survey
```

Then run:
```bash
cd frontend
npm run dev
```

## Quick Reference

| Method | File/Location | Variable Name |
|--------|---------------|---------------|
| GitHub Actions | GitHub Secrets | `VITE_SURVEY_URL` |
| Manual Deploy | `frontend/.env.production` | `VITE_SURVEY_URL` |
| Local Dev | `frontend/.env.local` | `VITE_SURVEY_URL` |

## Default Value

If you don't set `VITE_SURVEY_URL`, it defaults to:
```
https://example.com/survey
```

## Example: Complete .env.production File

```env
VITE_OPENAI_API_KEY=sk-proj-...
VITE_SURVEY_URL=https://forms.google.com/d/e/1FAIpQLSd.../viewform
VITE_REPO_NAME=legal-support-chat
```

## Troubleshooting

### Survey button shows default URL
- Check that `VITE_SURVEY_URL` is set correctly
- Rebuild/redeploy after updating
- Check browser console for errors

### Survey URL not updating
- Make sure you're using the exact variable name: `VITE_SURVEY_URL`
- Rebuild the project after changing environment variables
- Clear browser cache if testing locally

