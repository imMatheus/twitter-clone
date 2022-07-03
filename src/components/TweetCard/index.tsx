import React, { useState } from 'react'
import { Tweet as ITweet } from '@/types/Tweet'
import { getDateSincePost } from '@/utils/getDateSincePost'
import Link from 'next/link'
import { MoreHorizontal, MessageCircle } from 'react-feather'
import ProfileImage from '@/components/ProfileImage'
import { useRouter } from 'next/router'
import Popup from './Popup'
import MetaData from './MetaData'

interface TweetCardProps {
	tweet: ITweet
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
	const [showPopUp, setShowPopUp] = useState(false)
	const router = useRouter()
	const isReplied = 'repliedTo' in tweet && tweet.repliedTo?.owner

	return (
		<article className="cursor-pointer transition-colors hover:bg-text/[0.03]">
			<Link href={`/users/${tweet.owner.handle}/tweets/${tweet.id}`} passHref>
				<div className="flex items-start gap-4 p-4">
					<div className="flex flex-col items-end">
						{isReplied && <MessageCircle className="mb-1.5 h-3 w-3 fill-text-grayed text-text-grayed" />}
						<ProfileImage user={tweet.owner} size="12" />
					</div>

					<div className="min-w-0 flex-1">
						{isReplied && (
							<Link
								href={`/users/${tweet.repliedTo?.owner.handle}/tweets/${tweet.repliedTo?.id}`}
								passHref
							>
								<a className="mb-1.5 block text-xs font-semibold leading-none text-text-grayed hover:underline">
									Replied to {tweet.repliedTo?.owner.name}
								</a>
							</Link>
						)}
						<div className="flex items-center gap-1.5">
							<Link href={`/users/${tweet.owner.handle}`} passHref>
								<a className="cursor-pointer hover:underline">
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
						<pre className="min-w-0 whitespace-pre-wrap break-words break-all font-inter">{tweet.text}</pre>
						<MetaData tweet={tweet} />
					</div>
				</div>
			</Link>
		</article>
	)
}

export default TweetCard
