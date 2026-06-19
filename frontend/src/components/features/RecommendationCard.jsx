import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../common/Card'
import { RECOMMENDATIONS_ICONS } from '@/utils/constants'

export function RecommendationCard({ text, icon, priority = 'medium', details, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityColors = {
    high: 'border-l-4 border-l-red-500 bg-red-500/10',
    medium: 'border-l-4 border-l-yellow-500 bg-yellow-500/10',
    low: 'border-l-4 border-l-green-500 bg-green-500/10',
  }

  const priorityIcons = {
    high: '⚠️',
    medium: '💡',
    low: '✨',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={`p-4 cursor-pointer ${priorityColors[priority]}`}
        interactive
        onClick={() => details && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl mt-1">{priorityIcons[priority]}</span>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm mb-1">{text}</h4>
              {details && !isExpanded && (
                <p className="text-xs text-white/60 line-clamp-1">{details}</p>
              )}
            </div>
          </div>

          {details && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 text-white/60" />
            </motion.div>
          )}
        </div>

        {/* Expanded Details */}
        {details && isExpanded && (
          <motion.div
            className="mt-4 pl-11 pt-4 border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-white/70 leading-relaxed">{details}</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export default RecommendationCard
