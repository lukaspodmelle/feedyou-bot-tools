/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Manrope', 'sans-serif'],
		},
		extend: {
			colors: {
				accent: '#006CF8',
				'accent-50': '#D7E8FF',
			},
			screens: {
				xs: '475px',
			},
		},
	},
	plugins: [],
};
