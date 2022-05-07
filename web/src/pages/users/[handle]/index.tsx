import React from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useSWR } from '@/hooks/useSWR'
import { UserWithTweets } from '@/types/UserWithTweets'
import TweetsContainer from '@/components/TweetsContainer'
import UserBanner from '@/components/UserBanner'
import UserNotFoundBanner from '@/components/UserNotFoundBanner'

const UserPage: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query
	const [user] = useSWR<UserWithTweets>(`/users/${handle}`)
	console.log(user)

	return (
		<div className="">
			{user ? (
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
