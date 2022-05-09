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
			<div className={styles['circle-wrapper']}>
				<div className={styles['circle']}>{isSelected && <Check className="h-4 w-4 text-white" />}</div>
			</div>

			<p className="font-bold">{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
		</div>
	)
}

export default ThemeButton
