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
import ProfileCard from '@/components/profileCard'

const ExploreUsers: NextPage = () => {
	const router = useRouter()
	const { q } = router.query
	const { data, isLoading } = trpc.useQuery(['explore.searchUsers', { text: unCastArray(q) }])
	const users = data?.users

	return (
		<div>
			<Nav>
				<SearchBar base="/explore/users" />
			</Nav>
			<SectionPicker>
				<Option href="/explore" text="Tweets" />
				<Option href="/explore/users" text="Users" />
				<Option href="/explore/hashtags" text="Hashtags" />
			</SectionPicker>

			{isLoading ? (
				<div className="flex justify-center p-4">
					<Spinner />
				</div>
			) : q ? (
				users && users.length > 0 ? (
					users.map((user) => <ProfileCard user={user} key={user.id} />)
				) : (
					<h2 className="p-4 text-center text-lg font-semibold">Could not find anything</h2>
				)
			) : (
				<h2 className="p-4 text-center text-lg font-semibold">Start searching on Twitter</h2>
			)}
		</div>
	)
}

export default ExploreUsers
