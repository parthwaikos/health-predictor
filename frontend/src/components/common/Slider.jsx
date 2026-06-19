import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit,
  disabled = false,
  className,
}) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-white/80">{label}</label>
          {unit && (
            <span className="text-sm font-semibold text-white/60">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}

      <div className="relative pt-2 pb-4">
        {/* Track Background */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-white/10 rounded-full" />

        {/* Filled Track */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-brand rounded-full pointer-events-none"
          style={{ width: `${percentage}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Input Range */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            'relative w-full h-2 bg-transparent rounded-full appearance-none cursor-pointer accent-white pointer-events-auto z-5',
            'slider-thumb',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            WebkitAppearance: 'slider-horizontal',
          }}
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-white/40">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <style>{`
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: transparent;
          outline: none;
          cursor: pointer;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d9ff 0%, #b500ff 100%);
          cursor: pointer;
          box-shadow: 0 0 16px rgba(0, 217, 255, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.2s;
        }

        input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 24px rgba(0, 217, 255, 0.8);
          border-color: white;
        }

        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00d9ff 0%, #b500ff 100%);
          cursor: pointer;
          box-shadow: 0 0 16px rgba(0, 217, 255, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.2s;
        }

        input[type='range']::-moz-range-thumb:hover {
          box-shadow: 0 0 24px rgba(0, 217, 255, 0.8);
          border-color: white;
        }
      `}</style>
    </div>
  )
}

export default Slider
