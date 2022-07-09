import React from 'react'
import ColorPicker from './ColorPicker'
import Header from './Header'

const Accent: React.FC = ({}) => {
	return (
		<div className="border-b border-b-border p-4">
			<Header text="Accent color" />
			<div className="flex flex-wrap justify-between gap-4">
				<ColorPicker color="29 155 240" />
				<ColorPicker color="255 212 0" />
				<ColorPicker color="249 25 128" />
				<ColorPicker color="120 85 255" />
				<ColorPicker color="254 122 0" />
				<ColorPicker color="10 186 124" />
			</div>
		</div>
	)
}

export default Accent
