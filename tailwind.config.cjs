module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#faf7f2',
          100: '#f5efe3',
          200: '#ebddc8',
          300: '#ddc2a0',
        },
        clay: {
          500: '#a1644c',
          600: '#8f533e',
          700: '#7b4534',
        },
        olive: {
          500: '#6c7655',
          600: '#5d6649',
        },
        ink: '#2a241f',
      },
      boxShadow: {
        soft: '0 10px 35px rgba(42, 36, 31, 0.12)',
      },
      borderRadius: {
        xl2: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
      },
    },
  },
  plugins: [],
}
