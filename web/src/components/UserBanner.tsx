import React from 'react'
import { UserWithTweets } from '@/types/UserWithTweets'
import { ArrowLeft } from 'react-feather'
import Link from 'next/link'
import Image from 'next/image'
import UserBannerImage from '@/public/user-banner.svg'

interface UserBannerProps {
	user: UserWithTweets
}

const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
	console.log(user)

	return (
		<div className="">
			<div className="flex items-center gap-6 px-4">
				<Link href="/" passHref>
					<a>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-border">
							<ArrowLeft className="text-text" />
						</div>
					</a>
				</Link>
				<div>
					<h2 className="text-xl font-bold">{user.handle}</h2>
					<p className="text-sm text-text-grayed">{user.numberOfTweets} tweets</p>
				</div>
			</div>
			<div className="relative h-52 bg-red-500">
				<Image src={UserBannerImage} alt="User profile banner" layout="fill" objectFit="cover" />
			</div>
			<div className="px-4">
				<div className="flex justify-between">
					<div className="h-[5.5rem]">
						<div className="relative h-[11rem] w-[11rem] -translate-y-1/2 overflow-hidden rounded-full border-8 border-bg bg-white">
							<Image layout="fill" src={user.profileImage} alt={`${user.name} profile image`} />
						</div>
					</div>
					<div className="h-20 w-44 bg-green-500"></div>
				</div>
				<h2 className="text-lg">{user.name}</h2>
			</div>
		</div>
	)
}

export default UserBanner
