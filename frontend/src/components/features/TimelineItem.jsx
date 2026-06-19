import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { RISK_COLORS } from '@/utils/constants'
import { formatDate, formatTime } from '@/utils/formatters'

export function TimelineItem({ date, disease, riskLevel = 'low', prediction, onClick, index = 0 }) {
  const color = RISK_COLORS[riskLevel] || '#6b7280'
  const riskIcons = {
    diabetes: '🩺',
    heart: '❤️',
    stress: '🧠',
  }

  return (
    <motion.div
      className="flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full border-2 border-white/20 bg-white/5"
          style={{ borderColor: color }}
          whileHover={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="w-0.5 h-24 bg-gradient-to-b from-white/20 to-transparent mt-2" />
      </div>

      {/* Content */}
      <motion.div
        className="pb-8 flex-1 cursor-pointer group"
        onClick={onClick}
        whileHover={{ x: 4 }}
      >
        <div className="glass-panel p-4 rounded-lg group-hover:shadow-glow-md transition-all duration-300">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{riskIcons[disease] || '📊'}</span>
              <div>
                <h4 className="text-white font-semibold capitalize">{disease}</h4>
                <p className="text-xs text-white/60">{formatDate(date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="px-2 py-1 rounded text-xs font-semibold"
                style={{
                  backgroundColor: `${color}30`,
                  color: color,
                }}
              >
                ●{' '}
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
          </div>

          {/* Time */}
          <p className="text-xs text-white/50 mb-2">{formatTime(date)}</p>

          {/* Details */}
          {prediction && (
            <div className="text-sm text-white/70">
              <p>
                <span className="text-white/50">Risk: </span>
                <span>
                  {Math.round(prediction.confidence * 100)}% confidence
                </span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TimelineItem
