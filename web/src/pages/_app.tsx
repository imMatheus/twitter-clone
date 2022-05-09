import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { useTheme, ThemeProvider } from '@/context/ThemeContext'
import { useEffect } from 'react'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
	// const { theme, accentColor } = useTheme()

	// useEffect(() => {
	// 	const isServer = typeof window === 'undefined'
	// 	if (isServer) return

	// 	document.documentElement.setAttribute('data-theme', theme)
	// 	document.documentElement.style.setProperty('--accent-color', accentColor)
	// }, [theme, accentColor])

	return (
		<ThemeProvider>
			<div className="w-screen bg-bg px-4 text-text">
				<div className="mx-auto min-h-screen max-w-2xl border-x border-x-border py-4">
					<Component {...pageProps} />
				</div>
			</div>
		</ThemeProvider>
	)
}

export default MyApp
