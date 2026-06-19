import { motion } from 'framer-motion'
import { Navbar } from '@/components/common/Navbar'
import { Card } from '@/components/common/Card'

export function RiskMap() {
  const regions = [
    { name: 'North India', risk: 'high', cases: 1245, description: 'Higher risk due to climate' },
    { name: 'South India', risk: 'medium', cases: 856, description: 'Moderate risk levels' },
    { name: 'East India', risk: 'high', cases: 1089, description: 'Seasonal spike detected' },
    { name: 'West India', risk: 'low', cases: 432, description: 'Lower risk zone' },
  ]

  const seasons = [
    { season: 'Summer', risk: 'high', tips: 'Stay hydrated, avoid direct sun' },
    { season: 'Monsoon', risk: 'medium', tips: 'Be cautious of water-borne diseases' },
    { season: 'Winter', risk: 'low', tips: 'Good season for outdoor activities' },
  ]

  const getRiskColor = (risk) => {
    if (risk === 'high') return 'from-red-500/30 to-red-600/10'
    if (risk === 'medium') return 'from-yellow-500/30 to-yellow-600/10'
    return 'from-green-500/30 to-green-600/10'
  }

  const getRiskBadgeColor = (risk) => {
    if (risk === 'high') return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (risk === 'medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
      <Navbar />

      <motion.main
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
            Regional Health Risk Map
          </h1>
          <p className="text-white/60">Disease risk distribution across India with seasonal insights</p>
        </div>

        {/* Regions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Geographic Risk Distribution</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {regions.map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${getRiskColor(region.risk)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{region.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskBadgeColor(region.risk)}`}>
                      {region.risk.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{region.description}</p>
                  <p className="text-cyan-400 font-semibold">{region.cases.toLocaleString()} cases tracked</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Seasonal Risk */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Seasonal Risk Analysis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {seasons.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${getRiskColor(item.risk)}`}>
                  <h3 className="text-lg font-bold text-white mb-3">{item.season}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${getRiskBadgeColor(item.risk)}`}>
                    {item.risk.toUpperCase()}
                  </span>
                  <p className="text-white/70 text-sm">💡 {item.tips}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default RiskMap
