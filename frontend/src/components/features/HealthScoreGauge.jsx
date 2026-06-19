import { motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'
import { Card } from '../common/Card'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function HealthScoreGauge({ score = 75, category = 'Overall Health' }) {
  const getRiskColor = (value) => {
    if (value >= 80) return { bg: '#26de81', text: 'Excellent', status: 'healthy' }
    if (value >= 60) return { bg: '#ffa502', text: 'Good', status: 'moderate' }
    if (value >= 40) return { bg: '#ff6348', text: 'Fair', status: 'caution' }
    return { bg: '#ff006e', text: 'Poor', status: 'critical' }
  }

  const riskData = getRiskColor(score)

  const data = {
    labels: [riskData.text, 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [riskData.bg, 'rgba(255, 255, 255, 0.1)'],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBorderColor: 'rgba(255, 255, 255, 0.4)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.parsed}%`
          },
        },
      },
    },
  }

  return (
    <Card className="p-8 h-full flex flex-col items-center justify-center" glow>
      <motion.div
        className="w-full max-w-xs aspect-square"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative">
          <Doughnut data={data} options={options} />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                {score}
              </div>
              <p className="text-sm text-white/60 text-center mt-1">Health Score</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h3 className="text-white font-semibold mb-2">{category}</h3>
        <div className="flex items-center justify-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: riskData.bg }}
          />
          <span className="text-sm font-medium" style={{ color: riskData.bg }}>
            {riskData.text}
          </span>
        </div>
      </motion.div>
    </Card>
  )
}

export default HealthScoreGauge
