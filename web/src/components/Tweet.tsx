import React from 'react'
import { Tweet as ITweet } from '@/types/Tweet'
import { getDateSincePost } from '@/utils/getDateSincePost'

interface TweetProps {
    tweet: ITweet
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
    console.log(typeof tweet.createdAt)
    console.log(new Date(tweet.createdAt).toTimeString())

    return (
        <article className='bg-[#080808] p-4 flex gap-2 items-start'>
            <div className='w-10 h-10 rounded-full flex-shrink-0 bg-red-500'></div>
            <div className=''>
                <div className='flex gap-1.5 items-center mb-1'>
                    <h2 className='font-bold'>{tweet.owner.name}</h2>
                    <h3 className='text-gray-700 text-sm'>
                        @{tweet.owner.handle}
                    </h3>

                    <h4 className='text-gray-700 text-sm'>
                        {getDateSincePost(tweet.createdAt)}
                        {/* {tweet.createdAt + ''} */}
                    </h4>
                </div>
                <p>{tweet.text}</p>
            </div>
        </article>
    )
}

export default Tweet
