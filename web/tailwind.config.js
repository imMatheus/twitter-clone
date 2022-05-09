module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: 'var(--accent-color)',
				carolina: '#1D9BF0',
				olive: '#00ba7c',
				'candy-pink': '#f91880',
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
