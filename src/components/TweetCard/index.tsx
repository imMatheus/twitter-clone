import React, { useState } from 'react'
import { Tweet as ITweet } from '@/types/Tweet'
import { getDateSincePost } from '@/utils/getDateSincePost'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Repeat, Heart, MoreHorizontal } from 'react-feather'
import ProfileImage from '@/components/ProfileImage'
import { useRouter } from 'next/router'
import Popup from './Popup'

interface TweetCardProps {
	tweet: ITweet
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
	const [showPopUp, setShowPopUp] = useState(false)
	const router = useRouter()

	return (
		<article className="cursor-pointer transition-colors hover:bg-text/[0.03]">
			<Link href={`/users/${tweet.owner.handle}/tweets/${tweet.id}`} passHref>
				<div className="flex items-start gap-4 p-4">
					<ProfileImage user={tweet.owner} />

					<div className="w-full flex-1">
						<div className="flex items-center gap-1.5">
							<Link href={`/users/${tweet.owner.handle}`} passHref>
								<a className="cursor-pointer">
									<h2 className="font-bold">{tweet.owner.name}</h2>
								</a>
							</Link>
							<h3 className="text-sm text-text-grayed">@{tweet.owner.handle}</h3>
							<div className="h-0.5 w-0.5 rounded-full bg-text-grayed" aria-hidden></div>
							<time className="text-sm text-text-grayed" dateTime={tweet.createdAt + ''}>
								{getDateSincePost(tweet.createdAt)}
							</time>
							{/* Just to capture the group link to the tweet */}

							<div
								className="relative ml-auto"
								onClick={(e) => {
									e.stopPropagation()
									setShowPopUp(!showPopUp)
								}}
							>
								<div className="group relative">
									<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-carolina/20"></div>
									<MoreHorizontal className="relative h-4 w-4 text-text-grayed group-hover:text-carolina" />
								</div>
								{showPopUp && <Popup toggle={setShowPopUp} tweet={tweet} />}
							</div>
						</div>
						<pre className="font-inter">{tweet.text}</pre>
						<div className="mt-3 flex max-w-md justify-between text-text-grayed">
							<div className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-carolina">
								<div className="relative">
									<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-carolina/20"></div>
									<MessageCircle className="relative h-4 w-4" />
								</div>
								<span className="text-sm">{tweet.numberOfReplies}</span>
							</div>
							<div className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-olive">
								<div className="relative">
									<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-olive/20"></div>
									<Repeat className="relative h-4 w-4" />
								</div>
								<span className="text-sm">{tweet.numberOfReTweets}</span>
							</div>
							<div className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-candy-pink">
								<div className="relative">
									<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-candy-pink/20"></div>
									<Heart className="relative h-4 w-4" />
								</div>
								<span className="text-sm">{tweet.numberOfLikes}</span>
							</div>
							<div className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-carolina">
								<div className="relative">
									<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-carolina/20"></div>
									<Heart className="relative h-4 w-4" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</article>
	)
}

export default TweetCard
