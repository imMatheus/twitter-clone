import React from 'react'
import { Tweet as ITweet } from '@/types/Tweet'

interface TweetProps {
    tweet: ITweet
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
    return <div className='bg-red-500 p-4 rounded-md'>{tweet.text}</div>
}

export default Tweet
