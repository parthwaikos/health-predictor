import { useCallback } from 'react'
import { usePredictionContext } from '@/context/PredictionContext'
import { healthApi } from '@/services/api'
import { storage } from '@/services/storage'

export function usePrediction() {
  const context = usePredictionContext()

  const predict = useCallback(
    async (data) => {
      try {
        context.setLoading(true)
        const result = await healthApi.predict(data)
        context.setPrediction(result)

        // Save to history
        const historyItem = context.addToHistory(result)
        storage.addPredictionToHistory(historyItem)

        context.setLoading(false)
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Prediction failed'
        context.setErrorState(errorMessage)
        context.setLoading(false)
        throw error
      }
    },
    [context]
  )

  const loadHistory = useCallback(() => {
    const history = storage.getPredictionHistory()
    return history
  }, [])

  return {
    ...context,
    predict,
    loadHistory,
  }
}
