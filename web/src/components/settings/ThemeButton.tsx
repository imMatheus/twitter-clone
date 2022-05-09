import React, { useState } from 'react'
import { Check } from 'react-feather'
import { useTheme } from '@/context/ThemeContext'
import { Theme } from '@/types/Theme'
import styles from './ThemeButton.module.scss'

interface ThemeButtonProps {
	theme: Theme
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme }) => {
	const { theme: currentTheme, setTheme } = useTheme()

	const isSelected = theme === currentTheme

	const buttonStyle = styles['button-' + theme] + (isSelected ? ' ' + styles.selected : '')

	function onClickHandle() {
		setTheme(theme)
	}

	return (
		<div role="radiobutton" className={buttonStyle} onClick={onClickHandle}>
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors group-hover:bg-gray-700/50">
				<div className="flex h-5 w-5 items-center justify-center rounded-full border border-blue-600">
					{isSelected && <Check className="h-4 w-4" />}
				</div>
			</div>
			<p className="font-bold">{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
		</div>
	)
}

export default ThemeButton
