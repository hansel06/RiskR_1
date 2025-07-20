/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Subtle white border */
        input: "var(--color-input)", /* Charcoal gray */
        ring: "var(--color-ring)", /* Electric cyan */
        background: "var(--color-background)", /* Deep black */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Electric cyan */
          foreground: "var(--color-primary-foreground)", /* Deep black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Electric purple */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Hot pink */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Darker gray */
          foreground: "var(--color-muted-foreground)", /* Medium gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Neon green */
          foreground: "var(--color-accent-foreground)", /* Deep black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Charcoal gray */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Charcoal gray */
          foreground: "var(--color-card-foreground)", /* Pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Neon green */
          foreground: "var(--color-success-foreground)", /* Deep black */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Electric gold */
          foreground: "var(--color-warning-foreground)", /* Deep black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Hot pink */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
        surface: {
          DEFAULT: "var(--color-surface)", /* Charcoal gray */
          foreground: "var(--color-surface-foreground)", /* Pure white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      spacing: {
        '70': '17.5rem', // 280px for sidebar width
        'sidebar': 'var(--sidebar-width, 17.5rem)', // Dynamic sidebar width
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(138, 43, 226, 0.2)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.3)',
      },
      backdropBlur: {
        'glass': '8px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}