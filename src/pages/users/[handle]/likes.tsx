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

const Likes: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery(['users.byId', { handle: unCastArray(handle) }])
	const { data: tweetsData, isLoading: loadingTweets } = trpc.useQuery([
		'users.getLikedTweets',
		{ handle: unCastArray(handle) }
	])

	const user = data?.user

	if (isLoading)
		return (
			<div className="flex h-screen items-center justify-center">
				<Spinner />
			</div>
		)

	if (!user) return <UserNotFoundBanner />

	return (
		<div className="">
			<HeaderBox goBack title={user.name} subtitle={user.numberOfTweets + ' tweets'} />
			<UserBanner user={user} />
			{loadingTweets ? (
				<div className="flex items-center justify-center p-4">
					<Spinner />
				</div>
			) : (
				tweetsData?.tweets && tweetsData.tweets.length && <TweetsContainer tweets={tweetsData.tweets} />
			)}
		</div>
	)
}

export default Likes
