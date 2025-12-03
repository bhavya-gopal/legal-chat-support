import { useState, useEffect } from 'react'
import DisclaimerBanner from './DisclaimerBanner'
import QuickStartPrompts from './QuickStartPrompts'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { sendChatMessage } from '../services/openai'
import './ChatInterface.css'

const MAX_MESSAGES = 5

function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

function ChatInterface({ disclaimerData, scenarioData }) {
  const [messages, setMessages] = useState([])
  const [conversationHistory, setConversationHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [sessionId] = useState(() => generateSessionId())
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    // Store session ID for analytics
    localStorage.setItem('currentSessionId', sessionId)
  }, [sessionId])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || loading || sessionComplete) return

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    }

    // Increment message count immediately when message is sent
    const newMessageCount = userMessageCount + 1
    setUserMessageCount(newMessageCount)
    
    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      // Call OpenAI directly from frontend
      const data = await sendChatMessage(messageText, conversationHistory.map(m => ({
        role: m.role,
        content: m.content
      })))

      const aiMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMessage])
      setConversationHistory(data.conversationHistory)
      
      // Check if we've reached the message limit after AI responds
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
    } catch (error) {
      console.error('Error sending message:', error)
      let errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key configuration and try again.',
        timestamp: new Date().toISOString(),
        error: true
      }
      
      // More specific error messages
      if (error.message?.includes('API key')) {
        errorMessage.content = 'API key error. Please check that VITE_OPENAI_API_KEY is set correctly.'
      } else if (error.response?.status === 401) {
        errorMessage.content = 'Authentication error. Please check your OpenAI API key.'
      } else if (error.response?.status === 429) {
        errorMessage.content = 'Rate limit exceeded. Please try again in a moment.'
      }
      
      setMessages(prev => [...prev, errorMessage])
      // Revert message count on error since the message failed
      setUserMessageCount(userMessageCount)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickStart = (prompt) => {
    handleSendMessage(prompt)
  }

  const remainingMessages = MAX_MESSAGES - userMessageCount
  const surveyUrl = import.meta.env.VITE_SURVEY_URL || 'https://example.com/survey'

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
              <p>Choose a topic below or type your own question</p>
            </div>
          )}
          <QuickStartPrompts 
            onSelect={handleQuickStart} 
            disabled={sessionComplete || loading}
            compact={messages.length > 0}
          />
        </div>
      </div>
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={loading || sessionComplete}
        placeholder={sessionComplete ? "Chat session complete" : "Ask a legal question..."}
      />
      <DisclaimerBanner />
    </div>
  )
}

export default ChatInterface

