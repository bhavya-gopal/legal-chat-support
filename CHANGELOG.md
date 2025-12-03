# Changelog - New Features

## New Features Added

### 1. Scenario Introduction Screen
- **New Component**: `ScenarioModal.jsx`
- **Location**: Appears BEFORE the disclaimer modal
- **Content**: Welcome message setting context for the exercise
- **Behavior**: 
  - Cannot be dismissed without clicking "Start"
  - After "Start", shows disclaimer modal
  - Tracks timestamps (shownAt, clickedAt)

### 2. Always-Visible Quick Start Prompts
- **Updated Component**: `QuickStartPrompts.jsx`
- **New Behavior**:
  - Quick start buttons remain visible throughout entire chat session
  - Users can click buttons OR type custom questions
  - Both input methods work simultaneously
- **Styling**: 
  - Compact mode when messages exist (smaller cards)
  - Disabled state when session is complete

### 3. 5-Message Limit with Survey
- **Message Counter**: Visible counter showing remaining questions
- **Auto-Stop**: After 5th message and AI response:
  - Input field disabled with "Chat session complete" placeholder
  - All quick start buttons disabled and grayed out
  - Survey message appears automatically
- **Survey Integration**:
  - Survey button links to: `{SURVEY_URL}?session={sessionId}`
  - Session ID generated per chat session
  - Configurable via `VITE_SURVEY_URL` environment variable

## Technical Changes

### Components Modified
- `App.jsx`: Added scenario modal flow (scenario → disclaimer → chat)
- `ChatInterface.jsx`: 
  - Message counter logic
  - Session ID generation
  - 5-message limit enforcement
  - Survey message injection
- `ChatMessages.jsx`: Added survey message rendering
- `ChatInput.jsx`: Added placeholder prop support
- `QuickStartPrompts.jsx`: Added disabled and compact mode props

### New CSS Classes
- `.message-counter`: Counter display at top
- `.compact`: Compact quick start layout
- `.survey-message`, `.survey-button`: Survey message styling
- `.quick-start-intro`: Intro text when no messages

### Analytics Tracking
- Scenario timestamps: `scenarioShownAt`, `scenarioClickedAt`
- Session ID: `currentSessionId` stored in localStorage
- All timestamps logged to console for analytics

## Environment Variables

### Frontend
- `VITE_SURVEY_URL`: Survey URL for post-chat survey (optional)

## File Structure

```
frontend/src/components/
├── ScenarioModal.jsx (NEW)
├── ScenarioModal.css (NEW)
├── DisclaimerModal.jsx (unchanged)
├── ChatInterface.jsx (updated)
├── QuickStartPrompts.jsx (updated)
├── ChatMessages.jsx (updated)
└── ChatInput.jsx (updated)
```

