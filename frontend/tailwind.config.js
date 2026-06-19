export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          lighter: "rgba(255, 255, 255, 0.05)",
        },
        dark: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#1f2937",
          800: "#111827",
          900: "#0a0e17",
          950: "#030712",
        },
        neon: {
          cyan: "#00f5ff",
          pink: "#ff006e",
          violet: "#b500ff",
          teal: "#00d9ff",
        },
      },
      backgroundColor: {
        gradient: "linear-gradient(135deg, #0a0e17 0%, #131825 100%)",
        "glass-dark": "rgba(10, 14, 23, 0.5)",
      },
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, #00d9ff 0%, #b500ff 100%)",
        "gradient-danger": "linear-gradient(135deg, #ff006e 0%, #ff4757 100%)",
        "gradient-warning": "linear-gradient(135deg, #ffa502 0%, #ff6348 100%)",
        "gradient-success": "linear-gradient(135deg, #26de81 0%, #20c997 100%)",
        "glow-blob": "radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, rgba(181, 0, 255, 0.1) 50%, transparent 70%)",
      },
      backdropFilter: {
        glass: "blur(10px) saturate(200%)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
        "glow-sm": "0 0 8px rgba(0, 217, 255, 0.3)",
        "glow-md": "0 0 16px rgba(0, 217, 255, 0.5), 0 0 32px rgba(181, 0, 255, 0.2)",
        "glow-lg": "0 0 24px rgba(0, 217, 255, 0.6), 0 0 48px rgba(181, 0, 255, 0.3)",
        "glow-red": "0 0 16px rgba(255, 0, 110, 0.4)",
        "glow-yellow": "0 0 16px rgba(255, 165, 0, 0.4)",
        "glow-green": "0 0 16px rgba(38, 222, 129, 0.4)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "blob": "blob 7s infinite",
        "shimmer": "shimmer 2s infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 217, 255, 0.8), 0 0 60px rgba(181, 0, 255, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
        400: "400ms",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
}