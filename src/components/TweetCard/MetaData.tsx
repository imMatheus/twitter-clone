import React, { useState } from 'react'
import { MessageCircle, Repeat, Heart, Upload } from 'react-feather'
import { Tweet as ITweet } from '@/types/Tweet'
import { trpc } from '@/utils/trpc'
import classNames from 'classnames'

interface MetaDataProps {
	tweet: ITweet
}

const MetaData: React.FC<MetaDataProps> = ({ tweet }) => {
	const likeMutation = trpc.useMutation('tweets.like')
	const likedTheTweetInitially = tweet.likes?.length > 0
	const [hasLikedTweet, setHasLikedTweet] = useState(likedTheTweetInitially)
	const likeIncrementor = likedTheTweetInitially ? (hasLikedTweet ? 0 : -1) : hasLikedTweet ? 1 : 0

	return (
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
			<div
				onClick={(e) => {
					e.stopPropagation()
					likeMutation.mutate({ id: tweet.id })
					setHasLikedTweet(!hasLikedTweet)
				}}
				className={classNames(
					'group flex cursor-pointer items-center gap-3 transition-colors hover:text-candy-pink',
					{ 'fill-candy-pink text-candy-pink': hasLikedTweet }
				)}
			>
				<div className="relative">
					<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-candy-pink/20"></div>
					<Heart className={classNames('relative h-4 w-4', { 'fill-candy-pink': hasLikedTweet })} />
				</div>
				<span className="text-sm">{tweet.numberOfLikes + likeIncrementor}</span>
			</div>
			<div className="group flex cursor-pointer items-center gap-3 transition-colors hover:text-carolina">
				<div className="relative">
					<div className="absolute top-1/2 left-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full bg-transparent transition-colors group-hover:bg-carolina/20"></div>
					<Upload className="relative h-4 w-4" />
				</div>
			</div>
		</div>
	)
}

export default MetaData
