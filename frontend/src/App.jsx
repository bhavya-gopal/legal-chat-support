import { useState } from 'react'
import ScenarioModal from './components/ScenarioModal'
import DisclaimerModal from './components/DisclaimerModal'
import ChatInterface from './components/ChatInterface'
import './App.css'

function App() {
  const [scenarioStarted, setScenarioStarted] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [scenarioData, setScenarioData] = useState(null)
  const [disclaimerData, setDisclaimerData] = useState(null)

  const handleScenarioStart = (data) => {
    setScenarioStarted(true)
    setScenarioData(data)
    localStorage.setItem('scenarioShownAt', data.shownAt)
    localStorage.setItem('scenarioClickedAt', data.clickedAt)
    
    // Log scenario interaction for analytics
    console.log('Scenario started:', {
      shownAt: data.shownAt,
      clickedAt: data.clickedAt,
      timeToClick: new Date(data.clickedAt) - new Date(data.shownAt)
    })
  }

  const handleDisclaimerAccept = (data) => {
    setDisclaimerAccepted(true)
    setDisclaimerData(data)
    localStorage.setItem('disclaimerTimestamp', data.shownAt)
    localStorage.setItem('disclaimerAcknowledgedTimestamp', data.acknowledgedAt)
    
    // Log disclaimer acknowledgment for analytics
    console.log('Disclaimer acknowledged:', {
      shownAt: data.shownAt,
      acknowledgedAt: data.acknowledgedAt,
      timeToAcknowledge: new Date(data.acknowledgedAt) - new Date(data.shownAt)
    })
  }

  return (
    <div className="app">
      {!scenarioStarted ? (
        <ScenarioModal onStart={handleScenarioStart} />
      ) : !disclaimerAccepted ? (
        <DisclaimerModal onAccept={handleDisclaimerAccept} />
      ) : (
        <ChatInterface 
          disclaimerData={disclaimerData} 
          scenarioData={scenarioData}
        />
      )}
    </div>
  )
}

export default App

