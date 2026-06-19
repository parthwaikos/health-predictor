import { motion } from 'framer-motion'
import { Menu, X, Activity } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Navbar({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Assessment', href: '/questionnaire' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'History', href: '/history' },
  ]

  return (
    <nav className={`sticky top-0 z-40 glass-panel rounded-none border-b border-t-0 border-l-0 border-r-0 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Activity className="w-6 h-6 text-cyan-400 group-hover:text-pink-500 transition-colors" />
              <div className="absolute inset-0 animate-pulse-glow" />
            </div>
            <span className="font-bold text-lg bg-gradient-brand bg-clip-text text-transparent">
              HealthAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-brand group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 border-t border-white/10 mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-0 py-2 text-white/70 hover:text-white transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
