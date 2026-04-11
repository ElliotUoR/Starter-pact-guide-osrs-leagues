import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        osrs: {
          gold:        '#c9a84c',
          'gold-light':'#e8c96a',
          'gold-dim':  '#7a6428',
          bg:          '#0d0b07',
          panel:       '#1a1610',
          card:        '#221e14',
          border:      '#3d3318',
          parchment:   '#e8d5a8',
          muted:       '#7a6a4a',
          'pact-blue': '#5b9bd5',
          'pact-bg':   '#0c1d2e',
          'pact-border':'#1e3d5a',
          'gear-green':'#5aad6e',
          'gear-bg':   '#0c1f12',
          'gear-border':'#1e4a28',
          warning:     '#e8a030',
          'warning-bg':'#2a1a08',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'slide-in-right': {
          '0%':   { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.25s ease-out',
        'slide-in-left':  'slide-in-left  0.25s ease-out',
        'fade-in':        'fade-in        0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
