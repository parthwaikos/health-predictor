import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/common/Navbar'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ProgressBar, Input, Slider } from '@/components/common'
import { useForm } from '@/hooks/useForm'
import { usePredictionContext } from '@/context/PredictionContext'
import { isValidAge, isValidBMI } from '@/utils/validators'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const steps = [
  { id: 1, title: 'Basic Info', description: 'About you' },
  { id: 2, title: 'Physical Health', description: 'Health metrics' },
  { id: 3, title: 'Mental Wellness', description: 'Wellness check' },
  { id: 4, title: 'Review', description: 'Confirm' },
]

export function Questionnaire() {
  const navigate = useNavigate()
  const { setPrediction, setLoading } = usePredictionContext()
  const [currentStep, setCurrentStep] = useState(1)

  const initialValues = {
    age: '',
    sex: '',
    bmi: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    glucose: '',
    insulin: '',
    stress: 5,
    sleep: 7,
    mood: 'neutral',
  }

  const validate = (values) => {
    const errors = {}
    if (currentStep === 1) {
      if (!values.age) errors.age = 'Age is required'
      else if (!isValidAge(values.age)) errors.age = 'Age must be between 1 and 150'
      if (!values.sex) errors.sex = 'Please select your gender'
    }
    if (currentStep === 2) {
      if (!values.bmi) errors.bmi = 'BMI is required'
      else if (!isValidBMI(values.bmi)) errors.bmi = 'BMI must be between 10 and 60'
      if (!values.bloodPressureSystolic) errors.bloodPressureSystolic = 'Systolic BP required'
      if (!values.bloodPressureDiastolic) errors.bloodPressureDiastolic = 'Diastolic BP required'
      if (!values.glucose) errors.glucose = 'Glucose level required'
    }
    return errors
  }

  const form = useForm(initialValues, handleSubmit, validate)

  async function handleSubmit(values) {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      try {
        setLoading(true)
        const predictionData = {
          disease_type: 'diabetes',
          age: parseFloat(values.age),
          bmi: parseFloat(values.bmi),
          glucose: parseFloat(values.glucose),
          blood_pressure: parseFloat(values.bloodPressureSystolic),
          insulin: values.insulin ? parseFloat(values.insulin) : 0,
        }

        // Mock prediction result
        const mockResult = {
          prediction: Math.random() > 0.5 ? 1 : 0,
          label: Math.random() > 0.5 ? 'Diabetic Risk' : 'No Diabetes',
          confidence: Math.random() * 0.5 + 0.5,
          probability_0: Math.random() * 0.5,
          probability_1: Math.random() * 0.5 + 0.5,
          risk_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          recommendations: [
            '🏃 Exercise regularly for 30 minutes daily',
            '🥗 Reduce sugar and processed foods',
            '💧 Drink plenty of water',
          ],
        }

        setPrediction(mockResult)

        // Small delay to ensure state updates before navigation
        setTimeout(() => {
          setLoading(false)
          navigate('/dashboard')
        }, 500)
      } catch (error) {
        console.error('Submission error:', error)
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
      <Navbar />

      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <h1 className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
            Health Assessment
          </h1>
          <p className="text-white/60">Answer a few questions to get your personalized health insights</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mb-12" variants={itemVariants}>
          <ProgressBar currentStep={currentStep} totalSteps={4} steps={steps} />
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={form.handleSubmit} variants={itemVariants}>
          <Card className="p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-8">Tell us about yourself</h2>

                  <Input
                    label="Age"
                    type="number"
                    name="age"
                    value={form.values.age}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.errors.age}
                    touched={form.touched.age}
                    placeholder="Enter your age"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {['male', 'female', 'other'].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="sex"
                            value={option}
                            checked={form.values.sex === option}
                            onChange={form.handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-white capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                    {form.errors.sex && form.touched.sex && (
                      <p className="text-red-400 text-xs mt-1">{form.errors.sex}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Physical Health */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-8">Physical Health Metrics</h2>

                  <Input
                    label="BMI (Body Mass Index)"
                    type="number"
                    step="0.1"
                    name="bmi"
                    value={form.values.bmi}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.errors.bmi}
                    touched={form.touched.bmi}
                    placeholder="e.g., 25.5"
                    required
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Systolic BP (mmHg)"
                      type="number"
                      name="bloodPressureSystolic"
                      value={form.values.bloodPressureSystolic}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.errors.bloodPressureSystolic}
                      touched={form.touched.bloodPressureSystolic}
                      placeholder="e.g., 120"
                      required
                    />
                    <Input
                      label="Diastolic BP (mmHg)"
                      type="number"
                      name="bloodPressureDiastolic"
                      value={form.values.bloodPressureDiastolic}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={form.errors.bloodPressureDiastolic}
                      touched={form.touched.bloodPressureDiastolic}
                      placeholder="e.g., 80"
                      required
                    />
                  </div>

                  <Input
                    label="Glucose Level (mg/dL)"
                    type="number"
                    name="glucose"
                    value={form.values.glucose}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.errors.glucose}
                    touched={form.touched.glucose}
                    placeholder="e.g., 100"
                    required
                  />

                  <Input
                    label="Insulin Level (optional)"
                    type="number"
                    step="0.1"
                    name="insulin"
                    value={form.values.insulin}
                    onChange={form.handleChange}
                    placeholder="e.g., 15.5"
                  />
                </div>
              )}

              {/* Step 3: Mental Wellness */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Mental Wellness & Lifestyle</h2>

                  <Slider
                    label="Stress Level"
                    value={form.values.stress}
                    onChange={(val) => form.handleFieldChange('stress', val)}
                    min={1}
                    max={10}
                    unit=" / 10"
                  />

                  <Slider
                    label="Sleep Hours"
                    value={form.values.sleep}
                    onChange={(val) => form.handleFieldChange('sleep', val)}
                    min={0}
                    max={12}
                    step={0.5}
                    unit=" hrs"
                  />

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Overall Mood</label>
                    <select
                      name="mood"
                      value={form.values.mood}
                      onChange={form.handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                    >
                      <option value="poor">Poor</option>
                      <option value="neutral">Neutral</option>
                      <option value="good">Good</option>
                      <option value="excellent">Excellent</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-8">Review Your Information</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">Age</span>
                      <span className="font-semibold text-white">{form.values.age} years</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">Gender</span>
                      <span className="font-semibold text-white capitalize">{form.values.sex}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">BMI</span>
                      <span className="font-semibold text-white">{form.values.bmi}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">Blood Pressure</span>
                      <span className="font-semibold text-white">{form.values.bloodPressureSystolic}/{form.values.bloodPressureDiastolic} mmHg</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">Glucose</span>
                      <span className="font-semibold text-white">{form.values.glucose} mg/dL</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/70">Stress Level</span>
                      <span className="font-semibold text-white">{form.values.stress}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Sleep</span>
                      <span className="font-semibold text-white">{form.values.sleep} hours</span>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mt-6">
                    <p className="text-sm text-cyan-400">
                      ✓ All information has been validated. Click submit to generate your personalized health predictions.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={handleBack} className="flex-1">
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                loading={form.isSubmitting}
              >
                {currentStep === 4 ? 'Get Predictions' : 'Next Step'}
              </Button>
            </div>
          </Card>
        </motion.form>
      </motion.main>
    </div>
  )
}

export default Questionnaire
