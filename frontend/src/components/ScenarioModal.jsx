import { useState, useEffect } from 'react'
import './ScenarioModal.css'

function ScenarioModal({ onStart }) {
  const [shownAt] = useState(new Date().toISOString())

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleStart = () => {
    const clickedAt = new Date().toISOString()
    onStart({
      shownAt,
      clickedAt
    })
  }

  return (
    <div className="scenario-overlay">
      <div className="scenario-modal">
        <div className="scenario-header">
          <h2>Welcome to Your Legal Support Tool</h2>
        </div>
        <div className="scenario-body">
          <p>
            For this exercise, imagine you are a founder of an AI startup.
          </p>
          <p>
            You're navigating the complex landscape of AI compliance and regulations, 
            and you've discovered this legal support tool to help you understand your 
            compliance needs.
          </p>
          <p>
            Please interact with the tool as you naturally would when seeking legal 
            information for your startup.
          </p>
        </div>
        <div className="scenario-footer">
          <button
            onClick={handleStart}
            className="start-button"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScenarioModal

