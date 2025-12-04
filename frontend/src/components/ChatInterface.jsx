import { useState, useEffect } from 'react'
import DisclaimerBanner from './DisclaimerBanner'
import QuickStartPrompts from './QuickStartPrompts'
import ChatMessages from './ChatMessages'
import { HARDCODED_RESPONSES } from '../data/hardcodedResponses'
import './ChatInterface.css'

const MAX_MESSAGES = 5

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

function ChatInterface({ disclaimerData, scenarioData }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [sessionId] = useState(() => generateSessionId())
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    // Store session ID for analytics
    localStorage.setItem('currentSessionId', sessionId)
  }, [sessionId])

  const handleQuickStart = (prompt) => {
    if (loading || sessionComplete) return

    const userMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString()
    }

    // Increment message count immediately
    const newMessageCount = userMessageCount + 1
    setUserMessageCount(newMessageCount)
    
    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      // Get hardcoded response
      const responseText = HARDCODED_RESPONSES[prompt] || 'Response not found for this prompt.'

      const aiMessage = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMessage])
      setLoading(false)

      // Check if we've reached the message limit
      if (newMessageCount >= MAX_MESSAGES) {
        setSessionComplete(true)
        // Add survey message after a brief delay
        setTimeout(() => {
          const surveyMessage = {
            role: 'assistant',
            content: 'survey',
            timestamp: new Date().toISOString()
          }
          setMessages(prev => [...prev, surveyMessage])
        }, 500)
      }
    }, 800) // Small delay to show loading state
  }

  const remainingMessages = MAX_MESSAGES - userMessageCount
  const surveyUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSevPPyOxytVlHgEYo9IbuMlLCN5RplR8GYgjjHLUwlRDpoElg/viewform' // Update this with your actual survey URL

  return (
    <div className="chat-interface">
      {userMessageCount > 0 && (
        <div className="message-counter">
          {sessionComplete ? (
            <span className="counter-text">Chat session complete</span>
          ) : (
            <span className="counter-text">
              {remainingMessages} {remainingMessages === 1 ? 'question' : 'questions'} remaining
            </span>
          )}
        </div>
      )}
      <div className="chat-container">
        <div className="chat-content-wrapper">
          {messages.length > 0 && (
            <ChatMessages messages={messages} loading={loading} sessionId={sessionId} surveyUrl={surveyUrl} />
          )}
          {messages.length === 0 && (
            <div className="quick-start-intro">
              <h2>Get Started</h2>
              <p>Choose a topic below to learn more</p>
            </div>
          )}
          <QuickStartPrompts 
            onSelect={handleQuickStart} 
            disabled={sessionComplete || loading}
            compact={messages.length > 0}
          />
        </div>
      </div>
      <DisclaimerBanner />
    </div>
  )
}

export default ChatInterface

