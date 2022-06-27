import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import TweetsContainer from '@/components/TweetsContainer'
import UserBanner from '@/components/UserBanner'
import UserNotFoundBanner from '@/components/UserNotFoundBanner'
import Spinner from '@/components/Spinner'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'

const UserPage: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery([
		'users.byId',
		{ handle: Array.isArray(handle) ? handle[0] : (handle as string) }
	])

	console.log(data?.user)
	const user = data?.user

	return (
		<div className="">
			{isLoading ? (
				<Spinner />
			) : user ? (
				<>
					<HeaderBox goBack title={user.name} subtitle={user.numberOfTweets + ' tweets'} />
					<UserBanner user={user} />
					{user.tweets && user.tweets.length && <TweetsContainer tweets={user.tweets} />}
				</>
			) : (
				<UserNotFoundBanner />
			)}
		</div>
	)
}

export default UserPage
