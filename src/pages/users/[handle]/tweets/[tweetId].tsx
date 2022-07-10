import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProfileImage from '@/components/ProfileImage'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'
import { unCastArray } from '@/utils/unCastArray'
import TweetBox from '@/components/TweetBox'
import TweetsContainer from '@/components/TweetsContainer'

interface TweetScreenProps {}

const TweetScreen: React.FC<TweetScreenProps> = ({}) => {
	const router = useRouter()
	const { tweetId } = router.query
	const { data, isLoading } = trpc.useQuery(['tweets.byId', { id: unCastArray(tweetId) }])
	const { data: repliesData, isLoading: isLoadingReplies } = trpc.useQuery([
		'tweets.getRepliesById',
		{ id: unCastArray(tweetId) }
	])
	const tweet = data?.tweet
	const replies = repliesData?.replies

	return (
		<div>
			<HeaderBox title="Thread" goBack />
			{isLoading ? (
				<div className="mx-auto">
					<Spinner />
				</div>
			) : tweet ? (
				<>
					<div className="flex flex-col gap-4 p-4">
						<div className="flex gap-2">
							<ProfileImage user={tweet?.owner} size="12" />
							<div className="w-full flex-1">
								<div className="flex flex-col">
									<Link href={`/users/${tweet.owner.handle}`} passHref>
										<a className="cursor-pointer">
											<h2 className="font-bold">{tweet.owner.name}</h2>
										</a>
									</Link>
									<h3 className="text-text-grayed">@{tweet.owner.handle}</h3>
								</div>
							</div>
						</div>
						<pre className="min-w-0 whitespace-pre-wrap break-words break-all font-inter text-xl font-medium md:text-xl">
							{tweet.text}
						</pre>
						<div className="flex items-center gap-1 text-text-grayed">
							<p>12:53 AM</p>
							<div className="h-[2px] w-[2px] flex-shrink-0 rounded-full bg-text-grayed"></div>
							<p>May 12, 2021</p>
						</div>
					</div>
					<TweetBox tweetId={tweet.id} placeholder={`Reply to ${tweet.owner.name}`} />
					{replies && <TweetsContainer tweets={replies} />}
				</>
			) : (
				<h2 className="text-center text-base text-text-grayed">
					Hmm...this page doesn’t exist. Try searching for something else.
				</h2>
			)}
		</div>
	)
}

export default TweetScreen
