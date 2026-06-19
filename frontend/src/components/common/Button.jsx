import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-gradient-brand text-white hover:shadow-glow-md active:scale-95',
    secondary: 'glass-panel text-white hover:bg-white/20 hover:border-white/30 hover:shadow-glass',
    danger: 'bg-gradient-danger text-white hover:shadow-glow-red active:scale-95',
    ghost: 'text-white hover:bg-white/10 hover:border-white/20',
    outline: 'border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10',
  }

  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl',
  }

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {loading ? 'Loading...' : children}
    </motion.button>
  )
}

export default Button
