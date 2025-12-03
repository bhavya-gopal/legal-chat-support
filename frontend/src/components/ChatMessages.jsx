import { useEffect, useRef } from 'react'
import './ChatMessages.css'

function ChatMessages({ messages, loading, sessionId, surveyUrl }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSurveyClick = () => {
    const url = `${surveyUrl}?session=${sessionId}`
    window.open(url, '_blank')
  }

  return (
    <div className="chat-messages">
      {messages.map((message, index) => {
        if (message.content === 'survey') {
          return (
            <div key={index} className="message ai-message survey-message">
              <div className="message-content survey-content">
                <p>
                  Thank you for trying our legal support tool!
                </p>
                <p>
                  To help us improve, please complete a brief survey about your experience.
                </p>
                <button onClick={handleSurveyClick} className="survey-button">
                  Take Survey
                </button>
              </div>
            </div>
          )
        }
        
        return (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'} ${message.error ? 'error-message' : ''}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        )
      })}
      {loading && (
        <div className="message ai-message">
          <div className="message-content loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages

