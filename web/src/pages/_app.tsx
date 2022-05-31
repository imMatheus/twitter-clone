import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/layout/index'
import Sidebar from '@/components/sidebar'
import Head from 'next/head'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Head>
				<link rel="shortcut icon" href="/twitter.2.ico" />
			</Head>
			<div className="w-screen bg-bg px-4 font-inter text-text">
				<Layout>
					<Sidebar />
					<div className="min-h-screen w-full border-x border-x-border">
						<Component {...pageProps} />
					</div>
					<Sidebar />
				</Layout>
			</div>
		</ThemeProvider>
	)
}

export default MyApp
