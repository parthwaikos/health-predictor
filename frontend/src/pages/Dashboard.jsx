import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Download, RefreshCw } from 'lucide-react'
import { Navbar } from '@/components/common/Navbar'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { HealthScoreGauge, RiskCard, RecommendationCard, ChartWrapper } from '@/components/features'
import { usePredictionContext } from '@/context/PredictionContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Dashboard() {
  const navigate = useNavigate()
  const { currentPrediction, predictionHistory } = usePredictionContext()
  const [mockData] = useState({
    healthScore: currentPrediction ? Math.round(currentPrediction.confidence * 100) : 78,
    risks: [
      {
        disease: 'diabetes',
        riskLevel: currentPrediction?.risk_level || 'medium',
        confidence: currentPrediction?.confidence || 0.62,
        recommendations: currentPrediction?.recommendations || ['Reduce sugar intake', 'Exercise 30 mins daily', 'Monitor glucose levels'],
      },
      {
        disease: 'heart',
        riskLevel: 'low',
        confidence: 0.28,
        recommendations: ['Maintain healthy BP', 'Reduce sodium', 'Regular cardio'],
      },
      {
        disease: 'stress',
        riskLevel: 'high',
        confidence: 0.85,
        recommendations: ['Practice meditation', 'Get 7-8 hours sleep', 'Try yoga or tai chi'],
      },
    ],
    recommendations: [
      { text: '🏃 Exercise regularly', priority: 'high', details: 'Aim for 150 minutes of moderate activity per week' },
      { text: '🥗 Eat balanced diet', priority: 'high', details: 'Include vegetables, whole grains, and lean proteins' },
      { text: '😴 Sleep 7-8 hours', priority: 'medium', details: 'Maintain consistent sleep schedule' },
      { text: '💧 Stay hydrated', priority: 'medium', details: 'Drink at least 8 glasses of water daily' },
      { text: '🧘 Manage stress', priority: 'high', details: 'Try meditation, yoga, or breathing exercises' },
    ],
  })

  // Show data if we have currentPrediction or fallback to mock data
  const hasData = currentPrediction || mockData

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">No Predictions Yet</h2>
              <p className="text-white/60 mb-8">
                Start your health assessment to get personalized insights and recommendations.
              </p>
              <Button onClick={() => navigate('/questionnaire')} size="lg">
                Start Assessment
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
      <Navbar />

      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex justify-between items-center mb-12" variants={itemVariants}>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
              Your Health Dashboard
            </h1>
            <p className="text-white/60">Comprehensive health insights powered by AI</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              icon={RefreshCw}
              onClick={() => navigate('/questionnaire')}
            >
              New Assessment
            </Button>
            <Button icon={Download}>Export Report</Button>
          </div>
        </motion.div>

        {/* Health Score */}
        <motion.div className="mb-12 grid md:grid-cols-3 gap-8" variants={itemVariants}>
          <div className="md:col-span-1">
            <HealthScoreGauge score={mockData.healthScore} category="Overall Health" />
          </div>
          <div className="md:col-span-2">
            <Card className="p-8 h-full flex flex-col justify-center glow-lg">
              <h3 className="text-white font-bold text-lg mb-4">Health Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/70">Overall Risk</span>
                  <span className="font-semibold text-cyan-400">Moderate</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-white/70">Last Assessment</span>
                  <span className="font-semibold text-white">Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Risk Factors</span>
                  <span className="font-semibold text-orange-400">3 Detected</span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Risk Cards */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-6">Disease Risk Assessment</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {mockData.risks.map((risk, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <RiskCard
                  disease={risk.disease}
                  riskLevel={risk.riskLevel}
                  confidence={risk.confidence}
                  recommendations={risk.recommendations}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-6">Personalized Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {mockData.recommendations.map((rec, idx) => (
              <RecommendationCard
                key={idx}
                text={rec.text}
                priority={rec.priority}
                details={rec.details}
                index={idx}
              />
            ))}
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div className="grid md:grid-cols-2 gap-8" variants={itemVariants}>
          <ChartWrapper
            type="bar"
            title="Risk Levels Comparison"
            data={{
              labels: ['Diabetes', 'Heart', 'Stress'],
              datasets: [
                {
                  label: 'Risk Score (%)',
                  data: [62, 28, 85],
                  backgroundColor: [
                    'rgba(255, 165, 0, 0.6)',
                    'rgba(38, 222, 129, 0.6)',
                    'rgba(255, 0, 110, 0.6)',
                  ],
                  borderColor: [
                    'rgb(255, 165, 0)',
                    'rgb(38, 222, 129)',
                    'rgb(255, 0, 110)',
                  ],
                  borderWidth: 2,
                  borderRadius: 8,
                },
              ],
            }}
          />

          <ChartWrapper
            type="radar"
            title="Health Metrics Overview"
            data={{
              labels: ['Fitness', 'Diet', 'Sleep', 'Stress', 'Hydration'],
              datasets: [
                {
                  label: 'Your Score',
                  data: [65, 70, 60, 55, 80],
                  backgroundColor: 'rgba(0, 217, 255, 0.2)',
                  borderColor: 'rgb(0, 217, 255)',
                  borderWidth: 2,
                  pointBackgroundColor: 'rgb(0, 217, 255)',
                },
              ],
            }}
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 glass-panel p-8 rounded-2xl text-center border border-white/10"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-white mb-3">Want to Improve Your Health?</h3>
          <p className="text-white/70 mb-6">Take another assessment to track your progress</p>
          <Button onClick={() => navigate('/questionnaire')} size="lg">
            Take Another Assessment
          </Button>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default Dashboard
