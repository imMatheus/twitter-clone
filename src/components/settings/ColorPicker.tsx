import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { useTheme } from '@/context/ThemeContext'
import { AccentColor } from '@/types/AccentColor'

interface ColorPickerProps {
	color: AccentColor
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color }) => {
	const { accentColor, setAccentColor } = useTheme()

	function onClickHandle() {
		console.log(color)

		setAccentColor(color)
	}

	return (
		<div
			className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
			onClick={onClickHandle}
			style={{ backgroundColor: color }}
		>
			{color === accentColor && <Check className="h-7 w-7 text-white" />}
		</div>
	)
}

export default ColorPicker
