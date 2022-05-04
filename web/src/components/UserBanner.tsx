import React from 'react'
import { UserWithTweets } from '@/types/UserWithTweets'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

interface UserBannerProps {
    user: UserWithTweets
}

const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
    return (
        <div className='px-4'>
            <div className='flex gap-6 items-center'>
                <Link href='/' passHref>
                    <a>
                        <div className='w-10 h-10 flex bg-transparent items-center justify-center rounded-full transition-colors hover:bg-border'>
                            <ArrowLeft className='text-text' />
                        </div>
                    </a>
                </Link>
                <div>
                    <h2 className='text-xl font-bold'>{user.handle}</h2>
                    <p className='text-text-grayed text-sm'>{user.numberOfTweets} tweets</p>
                </div>
            </div>
            <div className='h-20 bg-red-500'></div>
            <h2 className='bg-green-200 text-lg'>{user.name}</h2>
        </div>
    )
}

export default UserBanner
