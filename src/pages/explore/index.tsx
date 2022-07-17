import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import SearchBar from '@/components/explore/search'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { unCastArray } from '@/utils/unCastArray'
import TweetsContainer from '@/components/TweetsContainer'
import Spinner from '@/components/Spinner'
import Nav from '@/components/container/nav'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'

const Explore: NextPage = () => {
	const router = useRouter()
	const { q } = router.query
	const { data, isLoading } = trpc.useQuery(['explore.search', { text: unCastArray(q) }])
	const tweets = data?.tweets

	return (
		<div>
			<Nav>
				<SearchBar base="/explore" />
			</Nav>
			<SectionPicker>
				<Option href="/explore" text="Tweets" />
				<Option href="/explore/users" text="Users" />
			</SectionPicker>

			{isLoading ? (
				<div className="flex justify-center p-4">
					<Spinner />
				</div>
			) : q ? (
				tweets ? (
					<TweetsContainer tweets={tweets} />
				) : (
					<h2 className="p-4 text-center text-lg font-semibold">Could not find anything</h2>
				)
			) : (
				<h2 className="p-4 text-center text-lg font-semibold">Start searching on Twitter</h2>
			)}
		</div>
	)
}

export default Explore
