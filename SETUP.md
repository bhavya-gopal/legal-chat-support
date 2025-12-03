# Setup Guide

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the `backend` directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```
   
   Replace `your_openai_api_key_here` with your actual OpenAI API key.
   
   Optionally, create a `.env` file in the `frontend` directory for survey URL:
   ```
   VITE_SURVEY_URL=https://your-survey-url.com/survey
   ```
   (If not set, defaults to example.com)

3. **Start the development servers:**
   ```bash
   npm run dev
   ```
   
   This starts both frontend (port 5173) and backend (port 3001) concurrently.

## Accessing Analytics Data

For analytics purposes, interaction timestamps are stored in browser localStorage:

- `scenarioShownAt`: ISO timestamp when scenario modal was first shown
- `scenarioClickedAt`: ISO timestamp when "Start" button was clicked
- `disclaimerTimestamp`: ISO timestamp when disclaimer was first shown
- `disclaimerAcknowledgedTimestamp`: ISO timestamp when user checked the checkbox
- `currentSessionId`: Unique session ID for the current chat session

You can access this data via browser console:
```javascript
// Scenario data
localStorage.getItem('scenarioShownAt')
localStorage.getItem('scenarioClickedAt')

// Disclaimer data
localStorage.getItem('disclaimerTimestamp')
localStorage.getItem('disclaimerAcknowledgedTimestamp')

// Session ID
localStorage.getItem('currentSessionId')
```

Timestamps are also logged to the console when interactions occur (check browser DevTools).

## Troubleshooting

- **API errors**: Make sure your `.env` file in the `backend` directory has a valid `OPENAI_API_KEY`
- **Port conflicts**: Change `PORT` in `.env` or frontend port in `vite.config.js`
- **CORS issues**: Backend is configured to accept requests from `localhost:5173`

