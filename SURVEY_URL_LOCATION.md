# Survey URL Location

The survey URL is now **hardcoded directly in the code** (no environment variables needed).

## Location

**File:** `frontend/src/components/ChatInterface.jsx`  
**Line:** 104

## How to Update

1. Open `frontend/src/components/ChatInterface.jsx`
2. Find line 104:
   ```javascript
   const surveyUrl = 'https://your-survey-url-here.com' // Update this with your actual survey URL
   ```
3. Replace `'https://your-survey-url-here.com'` with your actual survey URL

## Example

```javascript
const surveyUrl = 'https://forms.google.com/d/e/1FAIpQLSd.../viewform'
```

or

```javascript
const surveyUrl = 'https://typeform.com/to/abc123'
```

## After Updating

Just rebuild and deploy:
```bash
cd frontend
npm run deploy
```

That's it! No environment variables or GitHub Secrets needed.

