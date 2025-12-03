import './QuickStartPrompts.css'

const PROMPTS = [
  "Help me understand Delaware C-Corp formation requirements",
  "What compliance documents do I need for my AI startup?",
  "Explain GDPR requirements for AI training data",
  "What should be in my contractor agreements?",
  "Help me understand AI liability clauses",
  "What privacy policies do I need?"
]

function QuickStartPrompts({ onSelect, disabled = false, compact = false }) {
  return (
    <div className={`quick-start-container ${compact ? 'compact' : ''}`}>
      {!compact && (
        <div className="quick-start-header">
          <h2>Get Started</h2>
          <p>Choose a topic to begin, or type your own question below</p>
        </div>
      )}
      <div className={`quick-start-grid ${compact ? 'compact-grid' : ''}`}>
        {PROMPTS.map((prompt, index) => (
          <button
            key={index}
            className={`quick-start-card ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onSelect(prompt)}
            disabled={disabled}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickStartPrompts

