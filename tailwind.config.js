module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ["'Inter'", 'sans-serif']
			},
			colors: {
				accent: 'rgb(var(--accent-color) / <alpha-value>)',
				carolina: '#1D9BF0',
				olive: '#00ba7c',
				'candy-pink': '#f91880',
				danger: 'rgb(244, 33, 46)',
				bg: 'rgb(var(--bg) / <alpha-value>)',
				'bg-grayed': 'rgb(var(--bg-grayed) / <alpha-value>)',
				'bg-grayed-dark': 'rgb(var(--bg-grayed-dark) / <alpha-value>)',
				text: 'rgb(var(--text) / <alpha-value>)',
				'text-grayed': 'rgb(var(--text-grayed) / <alpha-value>)',
				border: 'rgb(var(--border) / <alpha-value>)'
			}
		}
	},
	plugins: []
}
