import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {      
      boxShadow: {
      googleLogin: '0 2px 4px 0 rgba(0,0,0,.25);',
      googleLoginHover: '0 0 3px 3px rgba(66,133,244,.3);',
      },
      colors: {
        navaraRed: "#ff4254",
        offwhite: "#F7F7F7",
        plant: 'rgb(74, 222, 128)',
        highlight: '#D8B4FE',
        navaraBlue: '#3665ff',
        navaraNavy: '#000b3b',
        googleBlue: '#5383EC',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
