import React from 'react'
import { Tweet } from '@/types/Tweet'
import TweetCard from '@/components/TweetCard'

interface TweetsContainerProps {
	tweets: Tweet[]
}

const TweetsContainer: React.FC<TweetsContainerProps> = ({ tweets }) => {
	return (
		<div className="divide-y divide-border">
			{tweets?.map((tweet) => (
				<TweetCard key={tweet.id} tweet={tweet} />
			))}
		</div>
	)
}

export default TweetsContainer
