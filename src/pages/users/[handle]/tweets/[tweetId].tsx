import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProfileImage from '@/components/ProfileImage'
import HeaderBox from '@/components/HeaderBox'
import { trpc } from '@/utils/trpc'
import Spinner from '@/components/Spinner'

interface TweetScreenProps {}

const TweetScreen: React.FC<TweetScreenProps> = ({}) => {
	const router = useRouter()
	const { tweetId } = router.query
	const { data, isLoading } = trpc.useQuery([
		'tweets.byId',
		{ id: Array.isArray(tweetId) ? tweetId[0] : (tweetId as string) }
	])
	const tweet = data?.tweet
	return (
		<div>
			<HeaderBox title="Thread" goBack />
			<div className="flex flex-col gap-4 p-4">
				{isLoading ? (
					<div className="mx-auto">
						<Spinner />
					</div>
				) : tweet ? (
					<>
						<div className="flex gap-2">
							<ProfileImage user={tweet?.owner} />

							<div className="w-full flex-1">
								<div className="flex flex-col">
									<Link href={`/users/abc`} passHref>
										<a className="cursor-pointer">
											<h2 className="font-bold">{tweet.owner.name}</h2>
										</a>
									</Link>
									<h3 className="text-text-grayed">@{tweet.owner.handle}</h3>
								</div>
							</div>
						</div>
						<p className="text-xl font-medium md:text-xl">{tweet.text}</p>
						<div className="flex items-center gap-1 text-text-grayed">
							<p>12:53 AM</p>
							<div className="h-[2px] w-[2px] flex-shrink-0 rounded-full bg-text-grayed"></div>
							<p>May 12, 2021</p>
						</div>
					</>
				) : (
					<h2 className="text-center text-base text-text-grayed">
						Hmm...this page doesn’t exist. Try searching for something else.
					</h2>
				)}
				<div className="h-screen bg-red-400"></div>
				<div className="h-screen bg-green-400"></div>
				<div className="h-screen bg-blue-400"></div>
			</div>
		</div>
	)
}

export default TweetScreen
