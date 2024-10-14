/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
  theme: {
	container: {
		center: true,
		padding: "2rem",
		screens: {
			"2xl": "1400px",
		},
	},
	fontFamily: {
		primary: '--font-marcellus',
		secondary: '--font-urbanist',
	},
	backgroundImage: {
		hero: 'url("hero/bg.jpg")',
	},
  	extend: {
		colors: {
			primary: {
				DEFAULT: '#292836',
				hover: '#3e3d4a',
			},
			secondary: {
				DEFAULT: '#6b6a71'
			},
			accent: {
				DEFAULT: '#e85f4c',
				hover: '#ea6f5e'
			},
			tertiary: {
				DEFAULT: '#faf5ef',
			},
			grey: {
				DEFAULT: '#a09faf',
			},
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height' },
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height' },
				to: { height: '0' },
			},
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
}

