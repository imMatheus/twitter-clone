import React from 'react'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'

const UserNotFoundBanner: React.FC = ({}) => {
    return (
        <div className='p-4'>
            <div className='flex gap-6 items-center'>
                <Link href='/' passHref>
                    <a>
                        <div className='w-10 h-10 flex bg-transparent items-center justify-center rounded-full transition-colors hover:bg-border'>
                            <ArrowLeft className='text-text' />
                        </div>
                    </a>
                </Link>
            </div>
            <h1 className='text-2xl font-bold text-center'>User not found</h1>
        </div>
    )
}

export default UserNotFoundBanner
