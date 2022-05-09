import React from 'react'
import ThemeButton from './ThemeButton'

const ThemeButtonWrapper: React.FC = () => {
	return (
		<div className="border-b border-b-border p-4">
			<h2 className="mb-3 text-2xl font-bold">Theme</h2>
			<div className="flex flex-col gap-4 md:flex-row">
				<ThemeButton theme="light" />
				<ThemeButton theme="dark" />
				<ThemeButton theme="dimmed" />
			</div>
		</div>
	)
}

export default ThemeButtonWrapper
