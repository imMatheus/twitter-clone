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

const WithReplies: NextPage = () => {
	const router = useRouter()
	const { handle } = router.query

	const { data, isLoading } = trpc.useQuery(['users.byId', { handle: unCastArray(handle) }])
	const { data: tweetsData, isLoading: loadingTweets } = trpc.useQuery([
		'users.getTweetsAndReplies',
		{ handle: unCastArray(handle) }
	])

	const user = data?.user
	const hasAccess = data?.hasAccess || false

	return (
		<div className="">
			{isLoading ? (
				<div className="flex h-screen items-center justify-center">
					<Spinner />
				</div>
			) : user ? (
				<>
					<HeaderBox goBack title={user.name} subtitle={user.numberOfTweets + ' tweets'} />
					<UserBanner user={user} hasAccess={hasAccess} />
					{loadingTweets ? (
						<div className="flex items-center justify-center p-4">
							<Spinner />
						</div>
					) : hasAccess ? (
						tweetsData?.tweets && tweetsData.tweets.length > 0 ? (
							<TweetsContainer tweets={tweetsData.tweets} />
						) : (
							<h2 className="p-4 text-lg font-semibold">
								Seems like {user.name} does not have any tweets
							</h2>
						)
					) : (
						<div className="flex justify-center p-4">
							<div className="max-w-sm">
								<h2 className="mb-2 text-3xl font-extrabold">These Tweets are protected</h2>
								<p className="mb-6 text-text-grayed">
									Only approved followers can see @{user.handle}&apos;s Tweets. To request access,
									click Follow.
								</p>
							</div>
						</div>
					)}
				</>
			) : (
				<UserNotFoundBanner />
			)}
		</div>
	)
}

export default WithReplies
