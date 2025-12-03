import { useState, useEffect } from 'react'
import './DisclaimerModal.css'

function DisclaimerModal({ onAccept }) {
  const [checked, setChecked] = useState(false)
  const [shownAt] = useState(new Date().toISOString())

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleContinue = () => {
    if (checked) {
      const acknowledgedAt = new Date().toISOString()
      onAccept({
        shownAt,
        acknowledgedAt
      })
    }
  }

  return (
    <div className="disclaimer-overlay">
      <div className="disclaimer-modal">
        <div className="disclaimer-header">
          <h2>Important: Understanding This Tool's Limitations</h2>
        </div>
        <div className="disclaimer-body">
          <p>
            This tool helps organize legal information but cannot replace your lawyer's judgment. 
            Always consult a licensed attorney for legal decisions.
          </p>
        </div>
        <div className="disclaimer-acknowledgment">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="disclaimer-checkbox"
            />
            <span>I understand this tool does not provide legal advice</span>
          </label>
        </div>
        <div className="disclaimer-footer">
          <button
            onClick={handleContinue}
            disabled={!checked}
            className={`continue-button ${checked ? 'enabled' : 'disabled'}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisclaimerModal

