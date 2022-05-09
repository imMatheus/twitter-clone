import React from 'react'
import ColorPicker from './ColorPicker'
import ThemeButtonWrapper from './ThemeButtonWrapper'

const Settings: React.FC = () => {
	return (
		<div>
			<div className="border-b border-b-border p-4">
				<h2 className="mb-3 text-2xl font-bold">Accent color</h2>
				<div className="flex flex-wrap justify-between gap-4">
					<ColorPicker color="#1d9bf0" />
					<ColorPicker color="#ffd400" />
					<ColorPicker color="#f91980" />
					<ColorPicker color="#7855ff" />
					<ColorPicker color="#fe7a00" />
					<ColorPicker color="#0aba7c" />
				</div>
			</div>
			<ThemeButtonWrapper />
		</div>
	)
}

export default Settings
