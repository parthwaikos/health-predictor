import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PredictionProvider } from '@/context/PredictionContext'
import { ChatWidget } from '@/components/features/ChatWidget'

// Pages
import Landing from '@/pages/Landing'
import Questionnaire from '@/pages/Questionnaire'
import Dashboard from '@/pages/Dashboard'
import RiskMap from '@/pages/RiskMap'
import History from '@/pages/History'
import ErrorPage from '@/pages/ErrorPage'

export default function App() {
  return (
    <Router>
      <PredictionProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/risk-map" element={<RiskMap />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ChatWidget />
      </PredictionProvider>
    </Router>
  )
}
