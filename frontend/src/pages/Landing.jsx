import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Heart, Brain, Zap } from 'lucide-react'
import { Navbar } from '@/components/common/Navbar'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'

export function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Heart,
      title: 'Physical Health',
      description: 'Track BMI, blood pressure, glucose levels and more',
    },
    {
      icon: Brain,
      title: 'Mental Wellness',
      description: 'Monitor stress levels, mood, and sleep quality',
    },
    {
      icon: Zap,
      title: 'AI Powered',
      description: 'Get instant predictions and personalized recommendations',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-cyan-pink opacity-20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-brand opacity-10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.main
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Content */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <div className="px-4 py-2 glass-panel rounded-full text-xs text-white/70 border-white/20">
              ✨ AI-Powered Health Predictions
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-cyan-pink bg-clip-text text-transparent">
            Your Personal Health Assistant
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get instant disease risk predictions powered by advanced AI. Take control of your health with personalized insights and actionable recommendations.
          </p>

          <Button
            onClick={() => navigate('/questionnaire')}
            size="lg"
            className="inline-flex items-center gap-2 group"
          >
            Start Health Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card interactive hover className="p-8 h-full text-center group">
                  <motion.div
                    className="inline-flex p-4 rounded-full bg-gradient-brand/10 mb-4 group-hover:shadow-glow-md transition-all"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
        >
          {[
            { value: '99.2%', label: 'Prediction Accuracy' },
            { value: '50K+', label: 'Happy Users' },
            { value: '24/7', label: 'Health Monitoring' },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="p-6 text-center glow-md">
                <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass-panel p-12 rounded-2xl text-center border border-white/10"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Health?</h2>
          <p className="text-white/70 mb-8">
            Join thousands of people taking control of their health with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/questionnaire')}
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
              View Dashboard
            </Button>
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default Landing
