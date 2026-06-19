import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function Input({
  label,
  error,
  touched,
  icon: Icon,
  className,
  type = 'text',
  placeholder,
  disabled = false,
  required = false,
  ...props
}) {
  const baseStyles = 'w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 transition-all duration-300 focus:outline-none focus:border-white/50 focus:shadow-glow-sm'

  const errorStyles = error && touched && 'border-red-500/60 focus:border-red-500'

  const disabledStyles = disabled && 'opacity-50 cursor-not-allowed'

  const classes = cn(baseStyles, errorStyles, disabledStyles, 'pl-10' && Icon, className)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
        )}

        <motion.input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={classes}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      </div>

      {error && touched && (
        <motion.p
          className="text-red-400 text-xs mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input
