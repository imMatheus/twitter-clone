import React from 'react'
import ColorPicker from './ColorPicker'
import ThemeButtonWrapper from './ThemeButtonWrapper'

const Settings: React.FC = () => {
	return (
		<div>
			<div className="border-b border-b-border p-4">
				<h2 className="mb-3 text-2xl font-bold">Accent color</h2>
				<div className="flex flex-wrap justify-between gap-4">
					<ColorPicker color="rgb(29, 155, 240)" />
					<ColorPicker color="rgb(255, 212, 0)" />
					<ColorPicker color="rgb(249, 25, 128)" />
					<ColorPicker color="rgb(120, 85, 255)" />
					<ColorPicker color="rgb(254, 122, 0)" />
					<ColorPicker color="rgb(10, 186, 124)" />
				</div>
			</div>
			<ThemeButtonWrapper />
		</div>
	)
}

export default Settings
