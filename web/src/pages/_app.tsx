import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className="w-screen bg-bg px-4 text-text">
			<div className="mx-auto min-h-screen max-w-2xl border-x border-x-border py-4">
				<Component {...pageProps} />
			</div>
		</div>
	)
}

export default MyApp
