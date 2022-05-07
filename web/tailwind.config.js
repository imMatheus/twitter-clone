module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				theme: 'var(--theme)',
				bg: 'var(--bg)',
				'bg-grayed': 'var(--bg-grayed)',
				'bg-grayed-dark': 'var(--bg-grayed-dark)',
				text: 'var(--text)',
				'text-grayed': 'var(--text-grayed)',
				border: 'var(--border)'
			}
		}
	},
	plugins: []
}
