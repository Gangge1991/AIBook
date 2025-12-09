import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindcssConfig],
  content: [
    './docs/.vuepress/**/*.{js,ts,vue,md}',
    './node_modules/vuepress-theme-reco/lib/**/*.{js,ts,vue,html,css}'
  ],
  safelist: [
    'bg-block',
    'border-block'
  ],
  theme: {
    extend: {
      colors: {
        block: {
            DEFAULT: '#f3f4f6', // Light mode
            dark: '#202022'    // Dark mode (optional, need to match theme's dark mode strategy)
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-block': {
          'background-color': '#f3f4f6',
        },
        '.dark .bg-block': {
          'background-color': '#202022',
        }
      })
    }
  ]
}
