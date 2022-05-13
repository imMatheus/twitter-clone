import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useQuery } from '@/hooks/useQuery'
import { UserWithTweets } from '@/types/UserWithTweets'
import TweetsContainer from '@/components/TweetsContainer'
import UserBanner from '@/components/UserBanner'
import UserNotFoundBanner from '@/components/UserNotFoundBanner'
import Spinner from '@/components/Spinner'

const UserPage: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query
	const [user, error, loading] = useQuery<UserWithTweets>(`/users/${handle}`)
	console.log(user)

	return (
		<div className="">
			{loading ? (
				<Spinner />
			) : user ? (
				<>
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
