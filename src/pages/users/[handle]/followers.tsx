import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import UserBanner from '@/components/UserBanner'
import UserNotFoundBanner from '@/components/UserNotFoundBanner'
import Spinner from '@/components/Spinner'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import { unCastArray } from '@/utils/unCastArray'
import SectionPicker from '@/components/sectionPicker'
import Option from '@/components/sectionPicker/Option'
import ProfileCard from '@/components/profileCard'

const Followers: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery(['users.getFollowers', { handle: unCastArray(handle) }])

	console.log('89')

	console.log(data)

	const user = data?.user

	return (
		<div className="">
			{isLoading || !user ? (
				<div className="flex h-screen items-center justify-center">
					<Spinner />
				</div>
			) : (
				<>
					<HeaderBox
						goBack
						goBackHref={`/users/${user.handle}`}
						title={user.name}
						subtitle={'@' + user.handle}
					/>
					<SectionPicker>
						<Option handle={user.handle} href="/followers" text="Followers" />
						<Option handle={user.handle} href="/following" text="Following" />
					</SectionPicker>

					{user?.followers.map(({ follower }) => (
						<ProfileCard key={follower.id} user={follower} />
					))}
				</>
			)}
		</div>
	)
}

export default Followers
