import { createContext, useContext, useState, useCallback } from 'react'

const PredictionContext = createContext()

export function PredictionProvider({ children }) {
  const [currentPrediction, setCurrentPrediction] = useState(null)
  const [predictionHistory, setPredictionHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setPrediction = useCallback((prediction) => {
    setCurrentPrediction(prediction)
    setError(null)
  }, [])

  const addToHistory = useCallback((prediction) => {
    const historyItem = {
      id: Date.now(),
      ...prediction,
      createdAt: new Date().toISOString(),
    }
    setPredictionHistory(prev => [historyItem, ...prev])
    return historyItem
  }, [])

  const clearHistory = useCallback(() => {
    setPredictionHistory([])
  }, [])

  const clearCurrentPrediction = useCallback(() => {
    setCurrentPrediction(null)
  }, [])

  const setErrorState = useCallback((err) => {
    setError(err)
  }, [])

  const value = {
    currentPrediction,
    predictionHistory,
    loading,
    error,
    setPrediction,
    addToHistory,
    clearHistory,
    clearCurrentPrediction,
    setLoading,
    setErrorState,
  }

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  )
}

export function usePredictionContext() {
  const context = useContext(PredictionContext)
  if (!context) {
    throw new Error('usePredictionContext must be used within PredictionProvider')
  }
  return context
}
