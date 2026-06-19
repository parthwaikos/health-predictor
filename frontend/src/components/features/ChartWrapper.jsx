import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card } from '../common/Card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  Filler,
  Tooltip,
  Legend
)

export function ChartWrapper({ type = 'line', data, options = {}, title, className = '' }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#e0e7ff',
          font: { size: 12 },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#e0e7ff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
      },
    },
  }

  const mergedOptions = { ...defaultOptions, ...options }

  // Chart specific configuration
  if (type === 'line') {
    mergedOptions.scales = {
      y: {
        ticks: { color: '#a0aec0', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      x: {
        ticks: { color: '#a0aec0', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
    }
  }

  if (type === 'bar') {
    mergedOptions.scales = {
      y: {
        ticks: { color: '#a0aec0', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      x: {
        ticks: { color: '#a0aec0', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
    }
  }

  if (type === 'radar') {
    mergedOptions.scales = {
      r: {
        ticks: { color: '#a0aec0', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    }
  }

  const chartComponents = {
    line: <Line data={data} options={mergedOptions} />,
    bar: <Bar data={data} options={mergedOptions} />,
    doughnut: <Doughnut data={data} options={mergedOptions} />,
    radar: <Radar data={data} options={mergedOptions} />,
  }

  return (
    <Card className={`p-6 ${className}`}>
      {title && <h3 className="text-white font-semibold mb-4">{title}</h3>}
      <div className="h-80">
        {chartComponents[type] || chartComponents.line}
      </div>
    </Card>
  )
}

export default ChartWrapper
