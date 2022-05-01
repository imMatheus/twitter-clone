import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='bg-cole-900 w-screen px-4 text-white'>
            <div className='max-w-3xl mx-auto py-4 min-h-screen border-x border-x-white/30'>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
