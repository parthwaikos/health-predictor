export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

export const RISK_COLORS = {
  low: '#26de81',      // Green
  medium: '#ffa502',   // Orange/Amber
  high: '#ff006e',     // Red/Pink
}

export const RISK_LABELS = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
}

export const DISEASE_TYPES = {
  DIABETES: 'diabetes',
  HEART: 'heart',
  STRESS: 'stress',
}

export const DISEASE_LABELS = {
  diabetes: 'Diabetes',
  heart: 'Heart Disease',
  stress: 'Stress Level',
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  CHATBOT: `${API_BASE_URL}/chatbot`,
  REPORT: `${API_BASE_URL}/report`,
  HEALTH: `${API_BASE_URL}/health`,
}

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

export const HEALTH_PARAMETERS = {
  age: { label: 'Age', unit: 'years', min: 1, max: 150 },
  bmi: { label: 'BMI', unit: 'kg/m²', min: 10, max: 60 },
  bloodPressure: { label: 'Blood Pressure', unit: 'mmHg', min: 0, max: 250 },
  glucose: { label: 'Glucose', unit: 'mg/dL', min: 0, max: 600 },
  stress: { label: 'Stress Level', unit: '1-10', min: 1, max: 10 },
  sleep: { label: 'Sleep', unit: 'hours', min: 0, max: 24 },
}

export const QUESTIONNAIRE_STEPS = [
  { id: 1, title: 'Basic Information', description: 'Tell us about yourself' },
  { id: 2, title: 'Physical Health', description: 'Physical measurements' },
  { id: 3, title: 'Mental Health', description: 'Mental wellness' },
  { id: 4, title: 'Review', description: 'Confirm your information' },
]

export const RECOMMENDATIONS_ICONS = {
  diet: '🍎',
  exercise: '🏃',
  sleep: '😴',
  stress: '🧘',
  doctor: '👨‍⚕️',
  medication: '💊',
  monitor: '📊',
}
