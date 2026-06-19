const STORAGE_KEYS = {
  PREDICTION_HISTORY: 'health_predictor_history',
  USER_PREFERENCES: 'health_predictor_preferences',
  AUTH_TOKEN: 'authToken',
}

export const storage = {
  // Prediction History
  getPredictionHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREDICTION_HISTORY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading prediction history:', error)
      return []
    }
  },

  savePredictionHistory(predictions) {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PREDICTION_HISTORY,
        JSON.stringify(predictions)
      )
    } catch (error) {
      console.error('Error saving prediction history:', error)
    }
  },

  addPredictionToHistory(prediction) {
    const history = this.getPredictionHistory()
    const newPrediction = {
      id: Date.now(),
      ...prediction,
      createdAt: new Date().toISOString(),
    }
    history.unshift(newPrediction)
    this.savePredictionHistory(history)
    return newPrediction
  },

  clearPredictionHistory() {
    localStorage.removeItem(STORAGE_KEYS.PREDICTION_HISTORY)
  },

  // User Preferences
  getPreferences() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
      return data ? JSON.parse(data) : { theme: 'dark' }
    } catch (error) {
      console.error('Error reading preferences:', error)
      return { theme: 'dark' }
    }
  },

  savePreferences(preferences) {
    try {
      localStorage.setItem(
        STORAGE_KEYS.USER_PREFERENCES,
        JSON.stringify(preferences)
      )
    } catch (error) {
      console.error('Error saving preferences:', error)
    }
  },

  // Auth Token
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  saveAuthToken(token) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
  },

  clearAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  // Clear All
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  },
}
