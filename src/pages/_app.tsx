import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { AuthProvider } from '@/context/AuthContext'
import { ModalProvider } from '@/context/ModalContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/layout/index'
import FocusedLayout from '@/components/layout/FocusedLayout'
import Sidebar from '@/components/sidebar'
import ExploreSidebar from '@/components/sidebar/explore'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import RoomList from '@/components/messages/RoomList'
import EditProfileModal from '@/components/modal/EditProfile'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())
Router.events.on('routeChangeComplete', () => NProgress.done())

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
	const isFocusedLayout = appProps.router.pathname.startsWith(`/messages`)

	const LayoutComponent = isFocusedLayout ? FocusedLayout : Layout

	return (
		<SessionProvider session={pageProps.session}>
			<AuthProvider>
				<ThemeProvider>
					<ModalProvider>
						<Head>
							<link rel="shortcut icon" href="/twitter.2.ico" />
						</Head>
						<div className="w-screen bg-bg px-4 font-inter text-text">
							<LayoutComponent>
								<Sidebar />
								{isFocusedLayout && <RoomList />}
								<div className="min-h-screen w-full min-w-0 border-x border-x-border">
									<Component {...pageProps} />
								</div>
								{!isFocusedLayout && <ExploreSidebar />}
							</LayoutComponent>
						</div>
					</ModalProvider>
				</ThemeProvider>
			</AuthProvider>
		</SessionProvider>
	)
}

import { withTRPC } from '@trpc/next'
import type { AppRouter } from '@/server/router'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'

function getBaseUrl() {
	if (typeof window) return '' // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`

		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error)
				}),
				httpBatchLink({
					url
				})
			]
		}
	},
	ssr: false // TODO: make sure this dosent break on true
})(MyApp)
