import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Theme } from '@/types/Theme'
import { AccentColor } from '@/types/AccentColor'

interface Context {
	theme: Theme
	accentColor: AccentColor
	setTheme: React.Dispatch<React.SetStateAction<Theme>>
	setAccentColor: React.Dispatch<React.SetStateAction<AccentColor>>
}

const ThemeContext = createContext<Context>({
	theme: 'light',
	accentColor: '29 155 240',
	setTheme: () => null,
	setAccentColor: () => null
})

export function useTheme() {
	return useContext(ThemeContext)
}

interface ThemeProviderProps {
	children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')
	const [accentColor, setAccentColor] = useLocalStorage<AccentColor>('accent-color', '29 155 240')

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	useEffect(() => {
		document.documentElement.style.setProperty('--accent-color', accentColor)
	}, [accentColor])

	const value = {
		theme,
		setTheme,
		accentColor,
		setAccentColor
	}
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
