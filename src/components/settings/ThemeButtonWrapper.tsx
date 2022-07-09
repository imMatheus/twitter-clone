import React from 'react'
import ThemeButton from './ThemeButton'
import Header from './Header'

const ThemeButtonWrapper: React.FC = () => {
	return (
		<div className="border-b border-b-border p-4">
			<Header text="Theme" />
			<div className="flex flex-col gap-4 md:flex-row">
				<ThemeButton theme="light" />
				<ThemeButton theme="dark" />
				<ThemeButton theme="dimmed" />
			</div>
		</div>
	)
}

export default ThemeButtonWrapper
