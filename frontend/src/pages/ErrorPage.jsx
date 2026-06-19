import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Navbar } from '@/components/common/Navbar'

export function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
      <Navbar />

      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center min-h-[calc(100vh-80px)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.div
            className="text-9xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-lg text-white/60 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')} size="lg">
              Go to Home
            </Button>
            <Button onClick={() => navigate('/dashboard')} variant="secondary" size="lg">
              View Dashboard
            </Button>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default ErrorPage
