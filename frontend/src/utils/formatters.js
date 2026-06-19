export function formatDate(date) {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${month}/${day}/${year}`
}

export function formatTime(date) {
  const d = new Date(date)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function formatRiskLevel(level) {
  if (!level) return 'Unknown'
  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
}

export function formatConfidence(value) {
  if (typeof value !== 'number') return '0%'
  return `${Math.round(value * 100)}%`
}

export function formatScore(score) {
  if (typeof score !== 'number') return '0'
  return Math.round(score)
}

export function truncateText(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
