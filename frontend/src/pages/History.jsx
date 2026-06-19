import { motion } from 'framer-motion'
import { Navbar } from '@/components/common/Navbar'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { useNavigate } from 'react-router-dom'
import { usePredictionContext } from '@/context/PredictionContext'
import { TimelineItem } from '@/components/features'

export function History() {
  const navigate = useNavigate()
  const { predictionHistory } = usePredictionContext()

  const mockHistory = [
    {
      id: 1,
      date: new Date('2024-01-20'),
      disease: 'diabetes',
      riskLevel: 'medium',
      confidence: 0.65,
    },
    {
      id: 2,
      date: new Date('2024-01-15'),
      disease: 'heart',
      riskLevel: 'low',
      confidence: 0.28,
    },
    {
      id: 3,
      date: new Date('2024-01-10'),
      disease: 'stress',
      riskLevel: 'high',
      confidence: 0.82,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
      <Navbar />

      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
            Prediction History
          </h1>
          <p className="text-white/60">View your past health assessments and track changes over time</p>
        </div>

        {mockHistory.length > 0 ? (
          <div className="space-y-4">
            {mockHistory.map((item, idx) => (
              <TimelineItem
                key={item.id}
                date={item.date}
                disease={item.disease}
                riskLevel={item.riskLevel}
                prediction={{ confidence: item.confidence }}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">No History Yet</h2>
            <p className="text-white/60 mb-6">Your past assessments will appear here</p>
            <Button onClick={() => navigate('/questionnaire')}>Start Assessment</Button>
          </Card>
        )}
      </motion.main>
    </div>
  )
}

export default History
