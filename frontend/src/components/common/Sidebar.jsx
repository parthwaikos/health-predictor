import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, BarChart3, Clock, MapPin } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const menuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { label: 'Risk Map', href: '/risk-map', icon: MapPin },
    { label: 'History', href: '/history', icon: Clock },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-64 glass-panel rounded-r-2xl border-l-0 border-t-0 z-40 flex flex-col"
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4 md:hidden">
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className="group"
                  >
                    <motion.div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-brand text-white shadow-glow-md'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-white"
                          layoutId="activeIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <p className="text-xs text-white/50">Health Predictor v1.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
