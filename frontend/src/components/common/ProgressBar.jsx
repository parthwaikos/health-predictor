import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function ProgressBar({ currentStep = 1, totalSteps = 4, steps = [] }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <motion.div
                key={stepNumber}
                className="flex flex-col items-center flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-brand text-white'
                      : isCurrent
                        ? 'bg-white/20 border-2 border-white text-white ring-2 ring-white/30'
                        : 'bg-white/10 border border-white/20 text-white/60'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </motion.div>

                {steps[index] && (
                  <div className="text-center">
                    <p className="text-xs font-medium text-white/70">{steps[index].title}</p>
                    <p className="text-xs text-white/40">{steps[index].description}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Animated Progress Line */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-brand"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
