# Legal Support Chat Interface

A chat interface for a legal support tool aimed at AI startup founders. This is an experiment to test disclaimer comprehension.

## Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
cd backend
cp env.example .env
# Edit .env and add your OPENAI_API_KEY
```

   Create a `.env` file in the `backend` directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

3. Run the development servers:
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:3001

## Deployment

To deploy to GitHub Pages, see the deployment guides:
- **[Quick Start Guide](./DEPLOY_QUICKSTART.md)** - Fast deployment instructions
- **[Full Deployment Guide](./DEPLOYMENT.md)** - Detailed deployment with backend setup

**Note:** GitHub Pages only serves static files, so your backend API will need to be deployed separately (see deployment guides for options).

## Features

- **Scenario Introduction Screen** - Welcome modal that appears before disclaimer
- **Disclaimer Modal** - Must acknowledge before using (shows on every refresh)
- **Chat Interface** - Persistent disclaimer banner
- **Quick Start Prompts** - Always visible prompt cards (not just initially)
- **5-Message Limit** - Visible counter showing remaining questions
- **Survey Integration** - Automatic survey link after 5th message with session ID
- **OpenAI GPT-4 Integration** - Legal information guidelines with proper system prompts
- **Timestamp Tracking** - Analytics for scenario, disclaimer, and message interactions

## Environment Variables

### Backend (.env in backend directory)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)

### Frontend (.env in frontend directory)
- `VITE_SURVEY_URL` - Survey URL for post-chat survey (optional, defaults to example.com)
  - Format: `VITE_SURVEY_URL=https://your-survey-url.com/survey`
  - The session ID will be automatically appended as a query parameter

