import React from 'react'
import type { NextPage } from 'next'
import SearchBar from '@/components/explore/search'

const explore: NextPage = () => {
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
			<div className="h-screen bg-red-500"></div>
			<div className="h-screen bg-green-500"></div>
			<div className="h-screen bg-red-500"></div>
		</div>
	)
}

export default explore
