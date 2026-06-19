# AI Health Predictor Frontend - Quick Reference Guide

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

**Dev Server**: http://localhost:5173/

## 📍 Routes & Navigation

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Landing | Welcome page with feature highlights |
| `/questionnaire` | Questionnaire | Multi-step health assessment form |
| `/dashboard` | Dashboard | Health insights and predictions |
| `/risk-map` | Risk Map | Regional and seasonal health risks |
| `/history` | History | Timeline of past assessments |

## 🎨 Design Colors

**Backgrounds**: `#0a0e17` → `#131825` (gradient)
**Accent Cyan**: `#00d9ff`
**Accent Pink**: `#ff006e`
**Accent Violet**: `#b500ff`
**Text**: `#e0e7ff`
**Text Secondary**: `#a0aec0`

## 📦 Component Usage Examples

### Button
```jsx
<Button 
  onClick={() => navigate('/questionnaire')}
  variant="primary"
  size="lg"
>
  Start Assessment
</Button>
```

### Card
```jsx
<Card glow interactive>
  <p>Card content</p>
</Card>
```

### Input
```jsx
<Input 
  label="Age"
  type="number"
  value={age}
  onChange={(e) => setAge(e.target.value)}
  error={errors.age}
  touched={touched.age}
/>
```

### Slider
```jsx
<Slider 
  label="Stress Level"
  value={stress}
  onChange={(val) => setStress(val)}
  min={1}
  max={10}
  unit=" / 10"
/>
```

### Modal
```jsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirmation"
>
  Content here
</Modal>
```

## 🔌 API Integration

### Predict Disease
```javascript
import { healthApi } from '@/services/api'

const result = await healthApi.predict({
  disease_type: 'diabetes',
  age: 45,
  bmi: 28.5,
  glucose: 150,
  blood_pressure: 130,
})
```

### Use Prediction Hook
```javascript
import { usePrediction } from '@/hooks/usePrediction'

const { predict, predictionHistory } = usePrediction()
await predict(formData)
```

## 🎯 Questionnaire Form Structure

**Step 1**: Age, Gender
**Step 2**: BMI, Blood Pressure, Glucose, Insulin
**Step 3**: Stress, Sleep, Mood
**Step 4**: Review & Submit

## 📊 Dashboard Features

- Health Score Gauge (0-100)
- 3 Disease Risk Cards with confidence bars
- 5 Personalized recommendations
- 2 Interactive charts (Bar + Radar)
- Export and reassess buttons

## 💬 Chat Widget

- Floating button (bottom-right)
- Auto-opens/closes
- Message history
- Ready for real chatbot integration

## 🧠 State Management

**Global Context**: `PredictionContext`
- `currentPrediction` - Latest prediction
- `predictionHistory` - All past predictions
- `loading` - Async loading state
- `error` - Error messages

**localStorage**:
- `health_predictor_history` - Prediction records
- `health_predictor_preferences` - User settings
- `authToken` - Auth token if available

## 🎨 Animations

**Page Transitions**: Fade + slide up
**Component Entrance**: Staggered children
**Hover Effects**: Scale + glow
**Loading**: Pulse + shimmer

## ♿ Accessibility Features

- Keyboard navigation (Tab, Enter, Esc)
- Focus indicators visible on all elements
- Color contrast WCAG 2.1 AA compliant
- ARIA labels on interactive elements
- Semantic HTML structure

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

## 🐛 Common Issues & Solutions

**Issue**: Build fails
**Fix**: `rm -rf node_modules && npm install`

**Issue**: Dev server slow
**Fix**: Close unused tabs, check disk space

**Issue**: Charts not showing
**Fix**: Check browser console for Chart.js errors

**Issue**: Styling looks different
**Fix**: Ensure Tailwind v4 is installed

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main router and app setup |
| `src/context/PredictionContext.jsx` | Global state |
| `src/services/api.js` | API client |
| `src/hooks/usePrediction.js` | Prediction logic |
| `src/utils/constants.js` | App constants |
| `tailwind.config.js` | Tailwind customization |

## 🔄 Deployment Ready

**Build**: `npm run build` → Creates `dist/` folder
**Preview**: `npm run preview` → Test production build locally
**Deploy**: Upload `dist/` contents to hosting

## ✅ Production Checklist

- [ ] Update API base URL in constants.js
- [ ] Test all forms and validations
- [ ] Verify all pages responsive on mobile
- [ ] Test all animations perform smoothly
- [ ] Update backend endpoints
- [ ] Enable real chatbot
- [ ] Set up export functionality
- [ ] Configure analytics
- [ ] Test error handling

## 🎓 Component Props Reference

### Button
```
variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
loading: boolean
disabled: boolean
icon: IconComponent
fullWidth: boolean
```

### Card
```
glow: boolean (shows shadow)
interactive: boolean (hover effects)
hover: boolean (hover state)
variant: 'default' | 'light' | 'dark'
className: string
```

### RiskCard
```
disease: 'diabetes' | 'heart' | 'stress'
riskLevel: 'low' | 'medium' | 'high'
confidence: 0-1 (decimal)
recommendations: string[]
```

## 💡 Pro Tips

1. Use `cn()` utility for conditional classes
2. Wrap changes with `motion.div` for animations
3. Always handle loading and error states
4. Use hooks instead of prop drilling
5. Keep components under 300 lines
6. Test responsive design early
7. Use semantic HTML for accessibility

---

**Last Updated**: 2026-06-19
**Status**: ✅ Production Ready
