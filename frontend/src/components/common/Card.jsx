import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function Card({
  children,
  className,
  variant = 'default',
  glow = false,
  interactive = false,
  hover = true,
  ...props
}) {
  const baseStyles = 'glass-panel relative overflow-hidden'

  const variantStyles = {
    default: 'bg-glass-dark border-glass',
    light: 'bg-white/5 border-white/20',
    dark: 'bg-black/40 border-white/10',
  }

  const glowStyles = glow && 'shadow-glow-md'

  const interactiveStyles =
    interactive && hover && 'cursor-pointer hover:shadow-glow-lg hover:border-white/20 transition-all duration-300'

  const classes = cn(baseStyles, variantStyles[variant], glowStyles, interactiveStyles, className)

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={interactive ? { y: -4 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
