export function isValidAge(age) {
  const num = Number(age)
  return num > 0 && num < 150
}

export function isValidBMI(bmi) {
  const num = Number(bmi)
  return num > 10 && num < 60
}

export function isValidBloodPressure(systolic, diastolic) {
  const sys = Number(systolic)
  const dia = Number(diastolic)
  return sys > 0 && sys < 300 && dia > 0 && dia < 200 && sys > dia
}

export function isValidGlucose(glucose) {
  const num = Number(glucose)
  return num > 0 && num < 600
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function isValidNumber(value) {
  return !isNaN(value) && value !== ''
}

export function isValidPhoneNumber(phone) {
  const regex = /^\d{10}$/
  return regex.test(phone.replace(/\D/g, ''))
}

export function validateFormData(data, requiredFields) {
  const errors = {}
  for (const field of requiredFields) {
    if (!data[field] && data[field] !== 0) {
      errors[field] = 'This field is required'
    }
  }
  return errors
}

export function getValidationMessage(field, value) {
  switch (field) {
    case 'age':
      return isValidAge(value) ? '' : 'Age must be between 0 and 150'
    case 'bmi':
      return isValidBMI(value) ? '' : 'BMI must be between 10 and 60'
    case 'glucose':
      return isValidGlucose(value) ? '' : 'Glucose must be between 0 and 600'
    case 'email':
      return isValidEmail(value) ? '' : 'Please enter a valid email'
    default:
      return ''
  }
}
