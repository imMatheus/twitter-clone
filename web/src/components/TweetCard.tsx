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
        <article className='p-4 flex gap-2 items-start'>
            <Link href={`/users/${tweet.owner.handle}`} passHref>
                <a className='cursor-pointer'>
                    <div className='w-12 relative h-12 rounded-full flex-shrink-0 bg-white overflow-hidden'>
                        <Image
                            layout='fill'
                            src={tweet.owner.profileImage}
                            alt={`${tweet.owner.name} profile image`}
                        />
                    </div>
                </a>
            </Link>
            <div className=''>
                <div className='flex gap-1.5 items-center'>
                    <Link href={`/users/${tweet.owner.handle}`} passHref>
                        <a className='cursor-pointer'>
                            <h2 className='font-bold'>{tweet.owner.name}</h2>
                        </a>
                    </Link>
                    <h3 className='text-text-grayed text-sm'>@{tweet.owner.handle}</h3>
                    <div className='w-0.5 h-0.5 rounded-full bg-text-grayed' aria-hidden></div>
                    <time className='text-text-grayed text-sm' dateTime={tweet.createdAt}>
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
