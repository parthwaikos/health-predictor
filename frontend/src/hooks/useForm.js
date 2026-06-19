import { useState, useCallback } from 'react'

export function useForm(initialValues, onSubmit, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setValues(prev => ({
      ...prev,
      [name]: newValue,
    }))
  }, [])

  const handleFieldChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))
    if (validate) {
      const fieldError = validate({ [name]: values[name] })
      setErrors(prev => ({
        ...prev,
        [name]: fieldError[name],
      }))
    }
  }, [values, validate])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.()
      setIsSubmitting(true)

      if (validate) {
        const newErrors = validate(values)
        setErrors(newErrors)
        setTouched(
          Object.keys(values).reduce((acc, key) => {
            acc[key] = true
            return acc
          }, {})
        )
        if (Object.keys(newErrors).length > 0) {
          setIsSubmitting(false)
          return
        }
      }

      try {
        await onSubmit?.(values)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleFieldChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  }
}
