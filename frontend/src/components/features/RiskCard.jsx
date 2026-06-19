import { motion } from 'framer-motion'
import { AlertCircle, TrendingUp, Heart } from 'lucide-react'
import { Card } from '../common/Card'
import { RISK_COLORS, RISK_LABELS } from '@/utils/constants'
import { formatConfidence } from '@/utils/formatters'

export function RiskCard({ disease, riskLevel = 'low', confidence = 0.5, recommendations = [] }) {
  const color = RISK_COLORS[riskLevel] || RISK_COLORS.low
  const glowColor = riskLevel === 'high' ? 'glow-red' : riskLevel === 'medium' ? 'glow-yellow' : 'glow-green'

  const riskIcons = {
    diabetes: '🩺',
    heart: '❤️',
    stress: '🧠',
  }

  return (
    <Card className={`p-6 ${glowColor}`} glow={riskLevel !== 'low'}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{riskIcons[disease] || '📊'}</div>
            <div>
              <h3 className="text-white font-semibold capitalize">{disease} Risk</h3>
              <p className="text-xs text-white/60">Health Assessment</p>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-1"
            animate={{ scale: riskLevel === 'high' ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-4 h-4" style={{ color }} />
          </motion.div>
        </div>

        {/* Risk Level Badge */}
        <div className="flex items-center gap-2">
          <motion.div
            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: `${color}30`, borderColor: color }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span style={{ color }}>● {RISK_LABELS[riskLevel]}</span>
          </motion.div>
          <span className="text-sm text-white/60">{formatConfidence(confidence)}</span>
        </div>

        {/* Confidence Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/60">Confidence</span>
            <span className="text-xs font-semibold text-white">{Math.round(confidence * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Recommendations Preview */}
        {recommendations.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-white/60 mb-2">Quick Tips:</p>
            <div className="space-y-1">
              {recommendations.slice(0, 2).map((rec, idx) => (
                <motion.div
                  key={idx}
                  className="text-xs text-white/70 flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-white/40 mt-0.5">•</span>
                  <span>{rec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default RiskCard
