# How to Test Locally

Since the app now uses hardcoded responses (no API needed), testing is simple!

## Quick Start

### Step 1: Install Dependencies

From the project root directory:

```bash
cd frontend
npm install
```

Or install everything at once from the root:

```bash
npm run install:all
```

### Step 2: Start the Development Server

From the `frontend` directory:

```bash
cd frontend
npm run dev
```

Or from the project root:

```bash
npm run dev:frontend
```

### Step 3: Open in Browser

The app will be available at:
```
http://localhost:5173
```

Open this URL in your browser to test!

## What You'll See

1. **Scenario Modal** - Welcome screen (click "Start")
2. **Disclaimer Modal** - Legal disclaimer (check box and click "Continue")
3. **Chat Interface** - 6 quick-start buttons with hardcoded responses
4. **5-Message Limit** - Counter showing remaining questions
5. **Survey Link** - Appears after 5th message

## Testing the Flow

1. Click through scenario and disclaimer modals
2. Click any of the 6 quick-start buttons
3. See the hardcoded response appear
4. Click more buttons (up to 5 total)
5. After 5 messages, see the survey link

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

### Dependencies Not Installed

If you get errors about missing modules:

```bash
cd frontend
npm install
```

### Changes Not Showing

- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Or restart the dev server: Stop with `Ctrl+C` and run `npm run dev` again

## No Backend Needed!

Since the app uses hardcoded responses, you don't need to:
- ❌ Run the backend server
- ❌ Set up OpenAI API keys
- ❌ Configure environment variables

Just run the frontend and test!

## Quick Commands Reference

```bash
# Install dependencies
cd frontend && npm install

# Start dev server
cd frontend && npm run dev

# Or from root directory
npm run dev:frontend
```

## Development Tips

- **Hot Reload**: Changes to code automatically refresh in the browser
- **Console Logs**: Open browser DevTools (F12) to see console logs
- **Network Tab**: Check network requests in DevTools
- **React DevTools**: Install React DevTools browser extension for debugging

