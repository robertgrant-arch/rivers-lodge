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
        bark: '#7A5C3A',
        cream: '#F5F0E8',
        parchment: '#EDE6D6',
        stone: '#C4B49A',
        brass: '#A8864A',
        'brass-light': '#C4A870',
        river: '#4A5E5A',
        available: '#E8EDE4',
        hold: '#F2E4C4',
        booked: '#C8B5A5',
        closed: '#D8D0C8',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', ...fontFamily.serif],
        body: ['var(--font-dm-sans)', ...fontFamily.sans],
        mono: ['var(--font-dm-mono)', ...fontFamily.mono],
      },
      fontSize: {
        'display-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.01em' }],
        'display-md': ['3rem', { lineHeight: '3.25rem', letterSpacing: '0.015em' }],
        'display-lg': ['4rem', { lineHeight: '4.25rem', letterSpacing: '0.02em' }],
        'display-xl': ['5rem', { lineHeight: '5.25rem', letterSpacing: '0.02em' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem', '30': '7.5rem', '34': '8.5rem',
      },
      maxWidth: {
        prose: '680px', content: '960px', layout: '1280px', wide: '1440px',
      },
      transitionDuration: { '250': '250ms', '280': '280ms', '600': '600ms' },
      transitionTimingFunction: { 'out-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
      backgroundImage: {
        'scrim-light': 'linear-gradient(to bottom, rgba(44,31,20,0.35) 0%, transparent 100%)',
        'scrim-medium': 'linear-gradient(to bottom, rgba(44,31,20,0.10) 0%, rgba(44,31,20,0.52) 100%)',
        'scrim-heavy': 'linear-gradient(to bottom, rgba(44,31,20,0.20) 0%, rgba(44,31,20,0.72) 100%)',
      },
      aspectRatio: { 'editorial': '4 / 3', 'portrait': '3 / 4', 'wide': '16 / 9', 'square': '1 / 1' },
      animation: {
        'fade-up': 'fadeUp 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 300ms ease-out forwards',
        'chevron-bounce': 'chevronBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        chevronBounce: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(6px)' } },
      },
    },
  },
  plugins: [],
}

export default config
