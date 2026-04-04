import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        soil: '#2C1F14',
        estate: '#3D2B1F',
        bark: '#5C4033',
        brass: '#B08D57',
        cream: '#FAF7F2',
        parchment: '#F0EBE1',
        stone: '#C4B49A',
        river: '#4A6741',
        available: '#4A6741',
        hold: '#B08D57',
        booked: '#8B4513',
        closed: '#6B6B6B',
        portal: {
          bg: '#1C140C',
          surface: '#2C1F14',
          border: '#3D2B1F',
          text: '#FAF7F2',
          muted: '#A89880',
          accent: '#B08D57',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', ...fontFamily.serif],
        body: ['DM Sans', ...fontFamily.sans],
        mono: ['DM Mono', ...fontFamily.mono],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}

export default config