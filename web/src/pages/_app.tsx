import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='bg-bg w-screen px-4 text-text'>
            <div className='max-w-3xl mx-auto py-4 min-h-screen border-x border-x-border'>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
