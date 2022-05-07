import React from 'react'
import { Tweet as ITweet } from '@/types/Tweet'
import { getDateSincePost } from '@/utils/getDateSincePost'
import Image from 'next/image'
import Link from 'next/link'

interface TweetCardProps {
	tweet: ITweet
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
	return (
		<article className="flex items-start gap-2 p-4">
			<Link href={`/users/${tweet.owner.handle}`} passHref>
				<a className="cursor-pointer">
					<div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white">
						<Image layout="fill" src={tweet.owner.profileImage} alt={`${tweet.owner.name} profile image`} />
					</div>
				</a>
			</Link>
			<div className="">
				<div className="flex items-center gap-1.5">
					<Link href={`/users/${tweet.owner.handle}`} passHref>
						<a className="cursor-pointer">
							<h2 className="font-bold">{tweet.owner.name}</h2>
						</a>
					</Link>
					<h3 className="text-sm text-text-grayed">@{tweet.owner.handle}</h3>
					<div className="h-0.5 w-0.5 rounded-full bg-text-grayed" aria-hidden></div>
					<time className="text-sm text-text-grayed" dateTime={tweet.createdAt}>
						{getDateSincePost(tweet.createdAt)}
						{/* {tweet.createdAt + ''} */}
					</time>
				</div>
				<p>{tweet.text}</p>
			</div>
		</article>
	)
}

export default TweetCard
