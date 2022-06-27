import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import SearchBar from '@/components/explore/search'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

const Explore: NextPage = () => {
	const router = useRouter()
	const { q } = router.query
	console.log('querys')
	console.log(router.asPath)

	// console.log(q)

	const tweets = trpc.useQuery(['tweets.search', { text: Array.isArray(q) ? q[0] : q || '' }])

	// console.log('57')
	// console.log(tweets)

	return (
		<div>
			<div className="sticky top-0 z-50 min-h-[3.5rem]">
				<div className="absolute inset-0 bg-bg opacity-80"></div>
				<div className="absolute inset-0 backdrop-blur-md"></div>
				<div className="relative z-50 flex h-full items-center gap-6 px-4 py-2">
					<SearchBar />
				</div>
			</div>
			hej
			<p className="break-al">{JSON.stringify(tweets.data)}</p>
			<div className="h-screen bg-red-500"></div>
			<div className="h-screen bg-green-500"></div>
			<div className="h-screen bg-red-500"></div>
		</div>
	)
}

export default Explore
